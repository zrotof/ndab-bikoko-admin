import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AgendaListContainerComponent } from './components/agenda-list-container/agenda-list-container.component';
import { AgendaAddEditContainerComponent } from './components/agenda-add-edit-container/agenda-add-edit-container.component';
import { AgendaEventTypeListContainerComponent } from './components/agenda-event-type-list-container/agenda-event-type-list-containercomponent';
import { AddEditEventTypeComponent } from './components/add-edit-event-type/add-edit-event-type.component';

const routes: Routes = [

  {path:'liste-par-type-d-evenement', component: AgendaListContainerComponent},
  {path:'creer-evenement', component: AgendaAddEditContainerComponent},
  {path:'modifier-evenement/:id', component: AgendaAddEditContainerComponent},
  {path:'liste-types-d-evenements', component: AgendaEventTypeListContainerComponent},
  {path:'creer-type-evenement', component: AddEditEventTypeComponent},
  {path:'modifier-type-evenement/:id', component: AddEditEventTypeComponent},

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AgendaRoutingModule { }
