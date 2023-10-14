import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { UsersRoutingModule } from './users-routing.module';
import { ReactiveFormsModule } from '@angular/forms';
import { PrimengModule } from 'src/app/shared/modules/primeng/primeng.module';
import { UsersAddEditComponent } from './components/users-add-edit/users-add-edit.component';


@NgModule({
  declarations: [
    UsersAddEditComponent
  ],
  imports: [
    CommonModule,
    UsersRoutingModule,
    PrimengModule,
    ReactiveFormsModule
  ]
})
export class UsersModule { }
