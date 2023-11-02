import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ResetPasswordComponent } from './components/reset-password/reset-password.component';
import { ResetPasswordRoutingModule } from './reset-password-routing.module';
import { PrimengModule } from 'src/app/shared/modules/primeng/primeng.module';
import { ReactiveFormsModule } from '@angular/forms';



@NgModule({
  declarations: [
    ResetPasswordComponent
  ],
  imports: [
    CommonModule,
    ResetPasswordRoutingModule,
    ReactiveFormsModule,
    PrimengModule
  ]
})
export class ResetPasswordModule { }
