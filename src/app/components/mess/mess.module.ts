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
import { MatTableModule } from '@angular/material/table';
import { MatPaginatorModule } from '@angular/material/paginator'
import { MatSortModule } from '@angular/material/sort';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatInputModule } from '@angular/material/input';
import { AddDishComponent } from './dishes/add-dish/add-dish.component';
import { MatDialogModule } from '@angular/material/dialog';
import { MatButtonModule } from '@angular/material/button';
import { MatSelectModule } from '@angular/material/select';
import { MatFormFieldModule } from '@angular/material/form-field';



@NgModule({
  declarations: [
    HomeComponent,
    DishesComponent,
    OrdersComponent,
    SubscriptionsComponent,
    ProfileComponent,
    AddDishComponent
  ],
  imports: [
    CommonModule,
    MessRoutingModule,
    MessAuthModule,
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
    FormsModule
  ]
})
export class MessModule { }
