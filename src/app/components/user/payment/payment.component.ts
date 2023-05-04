import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { I18nService } from 'src/app/global-services/i18n.service';
import { WindowRefService } from 'src/app/global-services/window-ref.service';
import { environment } from 'src/environments/environment';
import { AddressData, CartCheckout, CreateRPOrderData, DishData, DishQty, MessData, PaymentMode, validatePaymentPayload } from '../models';
import { UserService } from '../user.service';

@Component({
  selector: 'app-payment',
  templateUrl: './payment.component.html',
  styleUrls: ['./payment.component.less'],
  providers: [WindowRefService]
})
export class PaymentComponent extends I18nService implements OnInit {

  order: CreateRPOrderData = {
    amount: 0,
    amount_due: 0,
    amount_paid: 0,
    attempts: 0,
    created_at: '',
    currency: '',
    entity: '',
    id: '',
    notes: [],
    offer_id: '',
    receipt: '',
    status: ''
  };
  paymentMode: string = '';
  paymentModes: PaymentMode[] = [
    {
      key: 'cod',
      label: 'Cash On Delivery'
    },
    {
      key: 'online',
      label: 'Online'
    }
  ];
  deliveryAddress: AddressData | null = null;
  messAddress: MessData | null = null;
  cartItems: DishData[] = [];
  dishIds: DishQty[] = [];

  constructor(private service: UserService, private winRef: WindowRefService, private snackbar: MatSnackBar, private router: Router) {
    super();
    if (this.service.cart.length <= 0) {
      this.router.navigateByUrl('/user/checkout');
    }
    if (this.service.selectedAddress !== null) {
      this.deliveryAddress = this.service.selectedAddress;
    }
    if (this.service.selectedMess !== null) {
      this.messAddress = this.service.selectedMess;
    }

    if (this.service.cart !== null) {
      this.cartItems = this.service.cart;
    }
  }

  ngOnInit(): void {
  }

  async createRpayOrder() {
    await this.service.createOrderInRP(sessionStorage.getItem('userId') ?? '', this.total() * 100).subscribe({
      next: res => {
        if (res.meta.errorCode === 0) {
          this.order = res.data;
          this.payWithRazor(this.order.id);
        } else {
          this.snackbar.open(res.meta.message, '', { duration: 3000 });
        }
      },
      error: (err: HttpErrorResponse) => {
        this.snackbar.open(err.error.meta.message, '', { duration: 3000 });
      }
    });
  }

  payWithRazor(orderId: string) {
    const options: any = {
      key: environment.razorPay_Key_ID,
      amount: this.total() * 100,
      name: 'Mess Eat',
      description: 'Test Transaction',
      image: "https://github.com/jaimik64/mesheats/blob/34522c0cd38ed7d920a3756aa0a68ee0e8266c47/frontend/rpLogo.jpg",
      order_id: orderId,
      modal: { escape: false },
      theme: { color: '#3399cc' },
      prefill: {
        name: 'test',
        email: "test@mess.com",
        contact: "8401563076"
      }
    };

    options.handler = ((response: any, error: any) => {

      let res: validatePaymentPayload = {
        orderid: response.razorpay_order_id,
        paymentid: response.razorpay_payment_id,
        signature: response.razorpay_signature
      }

      this.validatePaymentSignature(res)

    })

    const rzp = new (this.winRef.nativeWindow as any).Razorpay(options);

    rzp.on('payment.failed', (res: any) => {
      alert(res.error.code);
      alert(res.error.description);
      alert(res.error.source);
      alert(res.error.step);
      alert(res.error.reason);
      alert(res.error.metadata.order_id);
      alert(res.error.metadata.payment_id);
    })

    rzp.open();

  }

  validatePayment(rpPaymentId: string, signature: string) {

    let reqData: validatePaymentPayload = {
      paymentid: rpPaymentId,
      orderid: this.order.id,
      signature: signature
    };
    this.service.validatePayment(sessionStorage.getItem('userId') ?? '', reqData).subscribe({
      next: res => {
        if (res.meta.errorCode === 0) {
          this.snackbar.open(res.meta.message, '', { duration: 3000 });
        } else {
          this.snackbar.open(res.meta.message, '', { duration: 3000 });
        }
      },
      error: (err: HttpErrorResponse) => {
        this.snackbar.open(err.error.meta.message, '', { duration: 3000 });
      }
    })
  }

  validatePaymentSignature(data: validatePaymentPayload) {

    this.service.validatePayment(sessionStorage.getItem('userId') ?? '', data).subscribe({
      next: result => {
        if (result.meta.errorCode === 0) {
          this.savePaymentDetailsInDb(data);
          this.snackbar.open(result.meta.message, '', { duration: 2000 });
        } else {
          this.snackbar.open(result.meta.message, '', { duration: 2000 });
        }
      },
      error: (err: HttpErrorResponse) => {
        this.snackbar.open(err.error.meta.message, '', { duration: 2000 });
      }
    })
  }

  savePaymentDetailsInDb(data: validatePaymentPayload) {
    this.service.savePaymentDetails(sessionStorage.getItem('userId') ?? '', data).subscribe({
      next: res => {
        if (res.meta.errorCode === 0) {
          this.onlinePayment(data.paymentid);
        } else {
          this.snackbar.open(res.meta.message);
        }
      },
      error: (err: HttpErrorResponse) => {
        this.snackbar.open(err.error.meta.message, '', { duration: 2000 });
      }
    })
  }

  total() {
    return this.service.subTotal();
  }

  proceed() {
    if (this.paymentMode === 'cod') {
      this.cashOnDelivery();
    } else {
      this.createRpayOrder();
    }
  }

  cashOnDelivery() {
    this.dishIds = this.cartItems.map(dish => {
      return {
        qty: dish.qty ?? 0,
        dishId: dish._id
      }
    });

    let payload: CartCheckout = {
      userid: sessionStorage.getItem('userId') ?? '',
      meshid: this.messAddress?._id ?? '',
      totalbill: this.total(),
      dishes: this.dishIds,
      status: "placed",
      payment: 'Cash On Delivery',
      addressid: this.deliveryAddress?._id ?? ''
    }

    this.service.createOrder(sessionStorage.getItem('userId') ?? '', payload).subscribe({
      next: res => {
        if (res.meta.errorCode === 0) {
          this.router.navigateByUrl('/');
          this.snackbar.open('Order Placed', '', { duration: 3000 });

        } else {
          this.snackbar.open(res.meta.message, '', { duration: 3000 });
        }
      },
      error: (err: HttpErrorResponse) => {
        this.snackbar.open(err.error.meta.message, '', { duration: 3000 });
      }
    })
  }

  onlinePayment(paymentId: string) {

    this.dishIds = this.cartItems.map(dish => {
      return {
        qty: dish.qty ?? 0,
        dishId: dish._id
      }
    });

    let payload: CartCheckout = {
      userid: sessionStorage.getItem('userId') ?? '',
      meshid: this.messAddress?._id ?? '',
      totalbill: this.total(),
      dishes: this.dishIds,
      status: "placed",
      payment: paymentId,
      addressid: this.deliveryAddress?._id ?? ''
    }

    this.service.createOrder(sessionStorage.getItem('userId') ?? '', payload).subscribe({
      next: res => {
        if (res.meta.errorCode === 0) {
          this.router.navigateByUrl('/');

          this.snackbar.open('Order Placed', '', { duration: 3000 });
        } else {
          this.snackbar.open(res.meta.message, '', { duration: 3000 });
        }
      },
      error: (err: HttpErrorResponse) => {
        this.snackbar.open(err.error.meta.message, '', { duration: 3000 });
      }
    })
  }

  clearData() {
    this.service.cart = [];
    this.service.selectedMess = null;
    this.service.selectedAddress = null;
  }
}
