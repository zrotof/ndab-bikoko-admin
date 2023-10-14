import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { LoginRoutingModule } from './login-routing.module';
import { LoginComponent } from './components/login/login.component';
import { PrimengModule } from 'src/app/shared/modules/primeng/primeng.module';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';


@NgModule({
  declarations: [
  ],
  imports: [
    LoginRoutingModule
  ]
})
export class LoginModule { }
