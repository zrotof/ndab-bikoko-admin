import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AgendaRoutingModule } from './agenda-routing.module';
import { AgendaListContainerComponent } from './components/agenda-list-container/agenda-list-container.component';
import { AgendaAddEditContainerComponent } from './components/agenda-add-edit-container/agenda-add-edit-container.component';
import { AgendaTypeComponent } from './components/agenda-type/agenda-type.component';
import { AddEditEventTypeComponent } from './components/add-edit-event-type/add-edit-event-type.component';
import { ReactiveFormsModule } from '@angular/forms';
import { PrimengModule } from 'src/app/shared/modules/primeng/primeng.module';


@NgModule({
  declarations: [
    AgendaListContainerComponent,
    AgendaAddEditContainerComponent,
    AgendaTypeComponent,
    AddEditEventTypeComponent
  ],
  imports: [
    CommonModule,
    AgendaRoutingModule,
    ReactiveFormsModule,
    PrimengModule
  ]
})
export class AgendaModule { }
