import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { InitResetPasswordComponent } from './components/init-reset-password/init-reset-password.component';
import { PrimengModule } from 'src/app/shared/modules/primeng/primeng.module';
import { ReactiveFormsModule } from '@angular/forms';
import { InitResetPasswordRoutingModule } from './init-reset-password-routing.module';



@NgModule({
  declarations: [
    InitResetPasswordComponent
  ],
  imports: [
    CommonModule,
    InitResetPasswordRoutingModule,
    ReactiveFormsModule,
    PrimengModule
  ]
})
export class InitResetPasswordModule { }
