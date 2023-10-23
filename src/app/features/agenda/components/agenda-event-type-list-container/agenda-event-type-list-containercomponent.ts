import { AsyncPipe } from '@angular/common';
import { Component, ViewEncapsulation } from '@angular/core';
import { RouterLink } from '@angular/router';
import { MessageService, ConfirmationService, ConfirmEventType } from 'primeng/api';
import { DialogService, DynamicDialogRef } from 'primeng/dynamicdialog';
import { Observable } from 'rxjs';
import { AgendaService } from 'src/app/shared/services/agenda/agenda.service';
import { EventTypeListComponent } from './event-type-list/event-type-list.component';

@Component({
  selector: 'app-agenda-event-type-list-container',
  templateUrl: './agenda-event-type-list-container.component.html',
  styleUrls: ['./agenda-event-type-list-container.component.scss'],
  providers: [MessageService, ConfirmationService, DialogService],
  encapsulation: ViewEncapsulation.None,
  standalone: true,
  imports: [
    RouterLink,
    AsyncPipe,
    EventTypeListComponent
  ],
})
export class AgendaEventTypeListContainerComponent {

  eventTypeList$ !: Observable<any>;

  constructor(
    private messageService : MessageService,
    private agendaService : AgendaService
  ) { }

  ngOnInit(): void {
    this.eventTypeList$ = this.agendaService.getEventTypeList();
  }

  getEventTypeList(){
    this.eventTypeList$ = this.agendaService.getEventTypeList();
  }

  deleteEventTypeById($event : string){

    const eventTypeId = $event;

    this.agendaService.deleteEventType(eventTypeId)
      .subscribe(
        (result : any) =>{
          console.log(result)
          if(result.status === "success" ){
            this.getEventTypeList();
            this.messageService.add({severity:'success', detail: result.message});
          }
          else{
            this.messageService.add({severity:'error', detail: result.message});
          }
        },
        (err) =>{
          this.messageService.add({severity:'error', detail: 'Erreur système: faire appel au webmaster'});
        }
      )
  }
}
