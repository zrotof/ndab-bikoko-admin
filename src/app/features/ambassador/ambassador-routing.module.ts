import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AmbassadorContainerComponent } from './components/ambassador-container/ambassador-container.component';

const routes: Routes = [
  {
    path:'',
    component: AmbassadorContainerComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AmbassadorRoutingModule { }
