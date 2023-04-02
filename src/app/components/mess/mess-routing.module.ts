import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DishesComponent } from './dishes/dishes.component';
import { HomeComponent } from './home/home.component';
import { OrdersComponent } from './orders/orders.component';
import { ProfileComponent } from './profile/profile.component';
import { SubscriptionsComponent } from './subscriptions/subscriptions.component';

const routes: Routes = [
  {
    path: 'home',
    component: HomeComponent
  },
  {
    path: 'auth',
    loadChildren: () => import('./mess-auth/mess-auth.module').then(m => m.MessAuthModule)
  },
  {
    path: 'profile',
    component: ProfileComponent
  },
  {
    path: 'manage-orders',
    component: OrdersComponent
  },
  {
    path: 'manage-subscriptions',
    component: SubscriptionsComponent
  },
  {
    path: 'manage-dishes',
    component: DishesComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class MessRoutingModule { }
