import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AgendaListContainerComponent } from './components/agenda-list-container/agenda-list-container.component';
import { AgendaAddEditContainerComponent } from './components/agenda-add-edit-container/agenda-add-edit-container.component';
import { AgendaTypeComponent } from './components/agenda-type/agenda-type.component';

const routes: Routes = [
  {path:'creer', component: AgendaAddEditContainerComponent},
  {path:'modifier/:id', component: AgendaAddEditContainerComponent},
  {path:'types-évênements', component: AgendaTypeComponent},
  {path:'', component: AgendaListContainerComponent},

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AgendaRoutingModule { }
