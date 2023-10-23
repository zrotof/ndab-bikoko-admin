import { Component, EventEmitter, Input, Output } from '@angular/core';
import { CommonModule, NgClass, NgIf } from '@angular/common';
import { ConfirmDialogModule } from 'primeng/confirmdialog';
import { OverlayModule } from 'primeng/overlay';
import { OverlayPanelModule } from 'primeng/overlaypanel';
import { TableModule } from 'primeng/table';
import { ToastModule } from 'primeng/toast';
import { ConfirmationService, ConfirmEventType, MessageService } from 'primeng/api';
import { AgendaService } from 'src/app/shared/services/agenda/agenda.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-event-type-list',
  standalone: true,
  imports: [
    NgIf,
    TableModule,
    OverlayModule,
    ConfirmDialogModule,
    ToastModule,
    OverlayPanelModule,
    NgClass
  ],
  templateUrl: './event-type-list.component.html',
  styleUrls: ['./event-type-list.component.scss'],
  providers: [MessageService, ConfirmationService]
})
export class EventTypeListComponent {

  @Input() eventTypes : any;
  @Output() deleteEventTypeEvent = new EventEmitter<string>();

  constructor(
    private messageService : MessageService, 
    private confirmationService: ConfirmationService,
    private agendaService: AgendaService,
    private router : Router
  ){}

  editEventType(eventTypeId : any){
    this.agendaService.getEventTypeById(eventTypeId)
      .subscribe(
        (result : any) => {

          if(result.status === "success"){
            this.router.navigate([`agenda/modifier-type-evenement/${eventTypeId}`], { queryParamsHandling: 'preserve' })
          }

          else{
            this.messageService.add({severity:'warn', detail: result.message });
          }

        },
        (err) =>{
          this.messageService.add({severity:'error', detail: 'Erreur, contactez webmaster' });
        }
      )
  }

  deleteEventType(eventTypeId: string){
    this.confirmationService.confirm({
      message: "Voulez-vous vraiment supprimer ce type d'évênement d'article?",
      accept: () => {
          this.deleteEventTypeEvent.emit(eventTypeId);
    },
        reject: (type: any) => {
            switch(type) {
                case ConfirmEventType.REJECT:
                    this.messageService.add({severity:'info', detail:'Suppression annulée'});
                break;
            }
        }
  }
)
  }
}
