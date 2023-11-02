import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { InitResetPasswordComponent } from './components/init-reset-password/init-reset-password.component';

const routes: Routes = [
  {
    path:'', component : InitResetPasswordComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class InitResetPasswordRoutingModule { }
