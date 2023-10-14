import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { UsersAddEditComponent } from './components/users-add-edit/users-add-edit.component';
import { UsersListComponent } from './components/user-list-container/users-list/users-list.component';
import { UserListContainerComponent } from './components/user-list-container/user-list-container.component';

const routes: Routes = [
  {path:'', component: UserListContainerComponent},
  {path:'creer', component: UsersAddEditComponent},
  {path:'modifier/:id', component: UsersAddEditComponent},
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class UsersRoutingModule { }
