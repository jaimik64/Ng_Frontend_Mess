import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DishesComponent } from './dishes/dishes.component';
import { HomeComponent } from './home/home.component';
import { OrderComponent } from './order/order.component';
import { ProfileComponent } from './profile/profile.component';
import { SubscriptionsComponent } from './subscriptions/subscriptions.component';

const routes: Routes = [
  {
    path: '',
    component: HomeComponent
  },
  {
    path: 'orders',
    component: OrderComponent
  },
  {
    path: 'profile',
    component: ProfileComponent
  },
  {
    path: 'subscriptions',
    component: SubscriptionsComponent
  },
  {
    path: 'dishes',
    component: DishesComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class UserRoutingModule { }
