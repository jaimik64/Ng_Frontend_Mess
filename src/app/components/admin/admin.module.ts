import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AdminRoutingModule } from './admin-routing.module';
import { ManageOrdersComponent } from './manage-orders/manage-orders.component';
import { ManageUserComponent } from './manage-user/manage-user.component';
import { ManageDishComponent } from './manage-dish/manage-dish.component';
import { ManageSubscriptionsComponent } from './manage-subscriptions/manage-subscriptions.component';
import { SharedModule } from '../shared/shared.module';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatDialogModule } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatMenuModule } from '@angular/material/menu';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatSelectModule } from '@angular/material/select';
import { MatSortModule } from '@angular/material/sort';
import { MatTableModule } from '@angular/material/table';
import { ManageMessComponent } from './manage-mess/manage-mess.component';


@NgModule({
  declarations: [
    ManageOrdersComponent,
    ManageUserComponent,
    ManageDishComponent,
    ManageSubscriptionsComponent,
    ManageMessComponent
  ],
  imports: [
    CommonModule,
    AdminRoutingModule,
    SharedModule,
    MatTableModule,
    MatPaginatorModule,
    MatSortModule,
    ReactiveFormsModule,
    MatInputModule,
    MatDialogModule,
    MatButtonModule,
    MatSelectModule,
    MatFormFieldModule,
    FormsModule,
    MatIconModule,
    MatMenuModule
  ]
})
export class AdminModule { }
