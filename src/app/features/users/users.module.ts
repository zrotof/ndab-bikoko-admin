import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { UsersRoutingModule } from './users-routing.module';
import { ReactiveFormsModule } from '@angular/forms';

import { UsersAddEditComponent } from './components/users-add-edit/users-add-edit.component';


@NgModule({
    imports: [
    CommonModule,
    UsersRoutingModule,
    ReactiveFormsModule,
    UsersAddEditComponent
]
})
export class UsersModule { }
