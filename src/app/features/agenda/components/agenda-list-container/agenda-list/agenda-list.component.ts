import { Component, EventEmitter, Input, Output } from '@angular/core';
import { DatePipe, NgClass, NgIf } from '@angular/common';
import { Router } from '@angular/router';
import { MessageService, ConfirmationService, ConfirmEventType } from 'primeng/api';
import { AgendaService } from 'src/app/shared/services/agenda/agenda.service';
import { ConfirmDialogModule } from 'primeng/confirmdialog';
import { OverlayModule } from 'primeng/overlay';
import { OverlayPanelModule } from 'primeng/overlaypanel';
import { TableModule } from 'primeng/table';
import { ToastModule } from 'primeng/toast';

@Component({
  selector: 'app-agenda-list',
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
  templateUrl: './agenda-list.component.html',
  styleUrls: ['./agenda-list.component.scss'],
  providers: [MessageService, ConfirmationService, DatePipe]
})
export class AgendaListComponent {

  @Input() events : any;
  @Output() deleteAgendaEvent = new EventEmitter<any>();

  constructor( 
    private router: Router,
    private agendaService : AgendaService,
    private messageService : MessageService, 
    private confirmationService: ConfirmationService,
    private datePipe : DatePipe
  ) { }

  editEvent(eventId : any){
    this.agendaService.getEventById(eventId)
      .subscribe(
        (result : any) => {

          if(result.status === "success"){
            this.router.navigate([`agenda/modifier-evenement/${eventId}`], { queryParamsHandling: 'preserve' })
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

  deleteEvent(eventId: string, categoryId: string){
    this.confirmationService.confirm({
      message: 'Voulez-vous vraiment supprimer cet évènement ?',
      accept: () => {

        const deleteObject = {
          eventId: eventId,
          categoryId: categoryId
        }
          //Emit event to do the delation
          this.deleteAgendaEvent.emit(deleteObject);
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

  convertDate( date : Date ) : string | null {
    return this.datePipe.transform(date, 'dd/MM/yyyy');
  }
}
