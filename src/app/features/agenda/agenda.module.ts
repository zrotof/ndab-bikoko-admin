import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AgendaRoutingModule } from './agenda-routing.module';
import { AgendaListContainerComponent } from './components/agenda-list-container/agenda-list-container.component';
import { AgendaAddEditContainerComponent } from './components/agenda-add-edit-container/agenda-add-edit-container.component';
import { AgendaEventTypeListContainerComponent } from './components/agenda-event-type-list-container/agenda-event-type-list-containercomponent';
import { AddEditEventTypeComponent } from './components/add-edit-event-type/add-edit-event-type.component';
import { ReactiveFormsModule } from '@angular/forms';


@NgModule({
  imports: [
    AddEditEventTypeComponent,
    AgendaEventTypeListContainerComponent,
    AgendaListContainerComponent,
    AgendaAddEditContainerComponent,
    CommonModule,
    AgendaRoutingModule,
    ReactiveFormsModule
]
})
export class AgendaModule { }
