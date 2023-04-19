import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ManageDishComponent } from './manage-dish/manage-dish.component';
import { ManageMessComponent } from './manage-mess/manage-mess.component';
import { ManageOrdersComponent } from './manage-orders/manage-orders.component';
import { ManageSubscriptionsComponent } from './manage-subscriptions/manage-subscriptions.component';
import { ManageUserComponent } from './manage-user/manage-user.component';

const routes: Routes = [
  {
    path: 'orders',
    component: ManageOrdersComponent
  },
  {
    path: 'dishes',
    component: ManageDishComponent
  },
  {
    path: 'users',
    component: ManageUserComponent
  },
  {
    path: 'subscriptions',
    component: ManageSubscriptionsComponent
  },
  {
    path: 'mess',
    component: ManageMessComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AdminRoutingModule { }
