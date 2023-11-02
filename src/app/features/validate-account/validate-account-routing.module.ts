import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ValidateAccountContainerComponent } from './components/validate-account-container/validate-account-container.component';

const routes: Routes = [
  {
    path: "",
    component : ValidateAccountContainerComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ValidateAccountRoutingModule { }
