import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CheckOutComponent } from './check-out/check-out.component';
import { DishesComponent } from './dishes/dishes.component';
import { HistoryComponent } from './history/history.component';
import { HomeComponent } from './home/home.component';
import { OrderComponent } from './order/order.component';
import { PaymentComponent } from './payment/payment.component';
import { ProfileComponent } from './profile/profile.component';
import { SubscriptionCheckOutComponent } from './subscription-check-out/subscription-check-out.component';
import { SubscriptionsComponent } from './subscriptions/subscriptions.component';

const routes: Routes = [
  {
    path: '',
    component: HomeComponent
  },
  {
    path: 'history',
    component: HistoryComponent
  },
  {
    path: 'profile',
    component: ProfileComponent
  },
  {
    path: 'dishes',
    component: DishesComponent
  },
  {
    path: 'checkout',
    component: CheckOutComponent
  },
  {
    path: 'payment',
    component: PaymentComponent
  },
  {
    path: 'sub-checkout',
    component: SubscriptionCheckOutComponent
  },
  {
    path: 'order',
    component: OrderComponent
  },
  {
    path: 'subcription',
    component: SubscriptionsComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class UserRoutingModule { }
