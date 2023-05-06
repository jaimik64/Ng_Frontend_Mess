import { HttpErrorResponse } from '@angular/common/http';
import { Component, Injectable, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
import { MatBottomSheet } from '@angular/material/bottom-sheet';
import { DateAdapter } from '@angular/material/core';
import { MatDateRangeSelectionStrategy, DateRange, MAT_DATE_RANGE_SELECTION_STRATEGY } from '@angular/material/datepicker';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { I18nService } from 'src/app/global-services/i18n.service';
import { WindowRefService } from 'src/app/global-services/window-ref.service';
import { environment } from 'src/environments/environment';
import { AddressListComponent } from '../address-list/address-list.component';
import { MessData, DishData, AddressData, SubscriptionPayload, CreateRPOrderData, validatePaymentPayload } from '../models';
import { UserService } from '../user.service';

@Injectable()
export class FiveDayRangeSelectionStrategy<D> implements MatDateRangeSelectionStrategy<D> {
  constructor(private _dateAdapter: DateAdapter<D>) { }

  selectionFinished(date: D | null): DateRange<D> {
    return this._createFiveDayRange(date);
  }

  createPreview(activeDate: D | null): DateRange<D> {
    return this._createFiveDayRange(activeDate);
  }

  private _createFiveDayRange(date: D | null): DateRange<D> {
    if (date) {
      const today = this._dateAdapter.today();
      if (this._dateAdapter.compareDate(date, today) < 0) {
        // Disable date selection if the given date is in the past
        return new DateRange<D>(null, null);
      }
      const start = this._dateAdapter.addCalendarDays(date, 0);
      const end = this._dateAdapter.addCalendarDays(date, 29);
      return new DateRange<D>(start, end);
    }
    return new DateRange<D>(null, null);
  }
}

@Component({
  selector: 'app-subscription-check-out',
  templateUrl: './subscription-check-out.component.html',
  styleUrls: ['./subscription-check-out.component.less'],
  providers: [
    {
      provide: MAT_DATE_RANGE_SELECTION_STRATEGY,
      useClass: FiveDayRangeSelectionStrategy,
    },
    WindowRefService
  ]
})
export class SubscriptionCheckOutComponent extends I18nService implements OnChanges {

  mess: MessData = {
    _id: '',
    name: '',
    email: '',
    mobile: '',
    location: '',
    city: ''
  };
  cartItems: DishData = {
    _id: '',
    dayname: '',
    isLunch: 0,
    rate: 0,
    description: ''
  };
  isBottomSheetOpened: boolean = false;
  selectedAddress: AddressData = {
    _id: '',
    name: '',
    mobile: '',
    pincode: '',
    address: '',
    city: ''
  }
  range = new FormGroup({
    start: new FormControl<Date | null>(null),
    end: new FormControl<Date | null>(null),
  });
  subscriptionPayload: SubscriptionPayload = {
    fees: 0,
    toDate: new Date(),
    fromDate: new Date(),
    userId: '',
    meshId: '',
    addressId: '',
    dishId: '',
    paymentId: ''
  }
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
  }

  constructor(private service: UserService, private snackbar: MatSnackBar, private router: Router, private _bottomSheet: MatBottomSheet, private winRef: WindowRefService) {
    super();

    if (this.service.selectedMess !== null) {
      this.mess = this.service.selectedMess;
    } else {
      this.router.navigateByUrl('/user');
      this.snackbar.open('Please Add Dishes', '', { duration: 2000, verticalPosition: 'top' });
    }

    if (this.service.selectedSubscription !== null) {
      this.cartItems = this.service.selectedSubscription;
    }

    if (this.service.selectedAddress !== null) {
      this.selectedAddress = this.service.selectedAddress;
    }
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (this.service.selectedAddress !== null) {
      this.selectedAddress = this.service.selectedAddress;
      console.log(this.selectedAddress);
    }
  }

  itemAvailableInCart(dish: DishData) {
    return this.service.itemAvailableInCart(dish);
  }

  totalItems() {
    if (this.service.selectedSubscription === null) {
      this.router.navigateByUrl('/user');
      return;
    } else {
      return;
    }
  }

  addMore() {
    this.router.navigateByUrl('/user/dishes');
  }

  subTotalBill() {
    return this.range.get('start')?.value !== null ? this.cartItems.rate * 30 : 0;
  }

  openBottomSheet() {
    this.isBottomSheetOpened = true;

    this._bottomSheet.open(AddressListComponent, { disableClose: true }).afterDismissed().subscribe((data) => {
      this.isBottomSheetOpened = data.status;
      this.selectedAddress = data.selectedAddress;
    })
  }

  placeOrder() {
    this.createRpayOrder();
  }

  async createRpayOrder() {
    await this.service.createOrderInRP(sessionStorage.getItem('userId') ?? '', this.cartItems.rate * 30 * 100).subscribe({
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
      amount: this.cartItems.rate * 30 * 100,
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
          this.completeOrder(data.paymentid);
        } else {
          this.snackbar.open(res.meta.message);
        }
      },
      error: (err: HttpErrorResponse) => {
        this.snackbar.open(err.error.meta.message, '', { duration: 2000 });
      }
    })
  }

  completeOrder(paymentId: string) {
    this.subscriptionPayload = {
      fees: this.cartItems.rate * 30,
      fromDate: this.range.get('start')?.value ?? new Date(),
      toDate: this.range.get('end')?.value ?? new Date(),
      userId: sessionStorage.getItem('userId') ?? '',
      meshId: this.mess._id,
      addressId: this.selectedAddress._id,
      paymentId: paymentId,
      dishId: this.cartItems._id
    }

    this.service.buySubscription(sessionStorage.getItem('userId') ?? '', this.subscriptionPayload).subscribe({
      next: res => {
        if (res.meta.errorCode === 0) {
          this.snackbar.open('Subscription Purchased', '', { duration: 2000 });
          this.router.navigateByUrl('/user');
        } else {
          this.snackbar.open(res.meta.message, '', { duration: 2000 });
        }
      },
      error: (err: HttpErrorResponse) => {
        this.snackbar.open(err.error.meta.message, '', { duration: 3000 });
      }
    })
  }
}
