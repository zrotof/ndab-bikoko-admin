import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ResetPasswordComponent } from './components/reset-password/reset-password.component';
import { ResetPasswordRoutingModule } from './reset-password-routing.module';

import { ReactiveFormsModule } from '@angular/forms';



@NgModule({
    imports: [
    CommonModule,
    ResetPasswordRoutingModule,
    ReactiveFormsModule,
    ResetPasswordComponent
]
})
export class ResetPasswordModule { }
