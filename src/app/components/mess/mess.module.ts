import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MessRoutingModule } from './mess-routing.module';
import { MessAuthModule } from './mess-auth/mess-auth.module';
import { SharedModule } from '../shared/shared.module';
import { HomeComponent } from './home/home.component';
import { DishesComponent } from './dishes/dishes.component';
import { OrdersComponent } from './orders/orders.component';
import { SubscriptionsComponent } from './subscriptions/subscriptions.component';
import { ProfileComponent } from './profile/profile.component';


@NgModule({
  declarations: [
    HomeComponent,
    DishesComponent,
    OrdersComponent,
    SubscriptionsComponent,
    ProfileComponent
  ],
  imports: [
    CommonModule,
    MessRoutingModule,
    MessAuthModule,
    SharedModule
  ]
})
export class MessModule { }
