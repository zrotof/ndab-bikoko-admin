import { Component, ViewEncapsulation } from '@angular/core';
import { Router } from '@angular/router';
import { MessageService, ConfirmationService, ConfirmEventType } from 'primeng/api';
import { AddEditEventTypeComponent } from '../add-edit-event-type/add-edit-event-type.component';
import { DialogService, DynamicDialogRef } from 'primeng/dynamicdialog';

@Component({
  selector: 'app-agenda-type',
  templateUrl: './agenda-type.component.html',
  styleUrls: ['./agenda-type.component.scss'],
  providers: [MessageService, ConfirmationService, DialogService],
  encapsulation: ViewEncapsulation.None
})
export class AgendaTypeComponent {

  ref !: DynamicDialogRef;

  constructor(
    private messageService : MessageService, 
    private confirmationService: ConfirmationService,
    public dialogService: DialogService,
    private router: Router,
  ) { }

  onAddEventType(){
    this.ref = this.dialogService.open( AddEditEventTypeComponent , {
      data : {
        mode : "edit"
      },
      baseZIndex : 10000,
      showHeader : false
    });
  }
}
