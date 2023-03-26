import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MessRoutingModule } from './mess-routing.module';
import { MessAuthModule } from './mess-auth/mess-auth.module';
import { SharedModule } from '../shared/shared.module';


@NgModule({
  declarations: [

  ],
  imports: [
    CommonModule,
    MessRoutingModule,
    MessAuthModule,
    SharedModule
  ]
})
export class MessModule { }
