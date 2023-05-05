import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { UserRoutingModule } from './user-routing.module';
import { ProfileComponent } from './profile/profile.component';
import { OrderComponent } from './order/order.component';
import { HomeComponent } from './home/home.component';
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
import { SubscriptionsComponent } from './subscriptions/subscriptions.component';
import { CartBottomSheetComponent, DishesComponent } from './dishes/dishes.component';
import { MatBottomSheetModule } from '@angular/material/bottom-sheet';
import { MatListModule } from '@angular/material/list';
import { CheckOutComponent } from './check-out/check-out.component';
import { AddressListComponent } from './address-list/address-list.component';
import { AddAddressComponent } from './address-list/add-address/add-address.component';
import { PaymentComponent } from './payment/payment.component';
import { MatRadioModule } from '@angular/material/radio';
import { MatStepperModule } from '@angular/material/stepper';
import { MatTabsModule } from '@angular/material/tabs';
import { SubscriptionListComponent } from './subscription-list/subscription-list.component';


@NgModule({
  declarations: [
    ProfileComponent,
    OrderComponent,
    HomeComponent,
    SubscriptionsComponent,
    DishesComponent,
    CartBottomSheetComponent,
    CheckOutComponent,
    AddressListComponent,
    AddAddressComponent,
    PaymentComponent,
    SubscriptionListComponent
  ],
  imports: [
    CommonModule,
    UserRoutingModule,
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
    MatMenuModule,
    MatBottomSheetModule,
    MatListModule,
    MatRadioModule,
    MatStepperModule,
    MatTabsModule
  ]
})
export class UserModule { }
