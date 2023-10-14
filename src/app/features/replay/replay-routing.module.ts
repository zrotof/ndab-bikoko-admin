import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ReplayListContainerComponent } from './components/replay-list-container/replay-list-container.component';
import { ReplayAddEditContainerComponent } from './components/replay-add-edit-container/replay-add-edit-container.component';

const routes: Routes = [
  {
    path:'',
    component : ReplayListContainerComponent
  },
  {
    path:"creer",
    component:  ReplayAddEditContainerComponent
  },
  {
    path:"modifier/:id",
    component:  ReplayAddEditContainerComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ReplayRoutingModule { }
