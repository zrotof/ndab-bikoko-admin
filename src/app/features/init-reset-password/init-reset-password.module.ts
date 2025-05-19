import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { InitResetPasswordComponent } from './components/init-reset-password/init-reset-password.component';

import { ReactiveFormsModule } from '@angular/forms';
import { InitResetPasswordRoutingModule } from './init-reset-password-routing.module';



@NgModule({
    imports: [
    CommonModule,
    InitResetPasswordRoutingModule,
    ReactiveFormsModule,
    InitResetPasswordComponent
]
})
export class InitResetPasswordModule { }
