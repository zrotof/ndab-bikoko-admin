import { AsyncPipe, NgIf } from '@angular/common';
import { Component, OnDestroy, OnInit, ViewEncapsulation } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { MessageService, ConfirmationService, ConfirmEventType } from 'primeng/api';
import { DialogService, DynamicDialogRef } from 'primeng/dynamicdialog';
import { Observable, Subscription, tap } from 'rxjs';
import { AgendaService } from 'src/app/core/services/planner/planner.service';
import { EventTypeListComponent } from './event-type-list/event-type-list.component';
import { Rubric } from 'src/app/shared/models/rubric';
import { ToastModule } from 'primeng/toast';
import { TableReorderUtils } from 'src/app/shared/utils/table-reorder.utils';
import { ConfirmDialogModule } from 'primeng/confirmdialog';
import { Reorder } from 'src/app/shared/models/reorder';

@Component({
    selector: 'app-agenda-event-type-list-container',
    templateUrl: './agenda-event-type-list-container.component.html',
    styleUrls: ['./agenda-event-type-list-container.component.scss'],
    providers: [MessageService, ConfirmationService, DialogService],
    encapsulation: ViewEncapsulation.None,
    imports: [
        RouterLink,
        AsyncPipe,
        NgIf,
        EventTypeListComponent,
        ToastModule,
        ConfirmDialogModule,
    ]
})
export class AgendaEventTypeListContainerComponent implements OnInit, OnDestroy {

  eventTypeList$ !: Observable<Rubric[]>;

  firstOrderedEventTypeList !: Rubric[];
  currentOrderedEventTypeList !: Rubric[];
  areThereNewEventOrderToSave = false;

  private subscriptions: Subscription[] = [];

  constructor(
    private messageService : MessageService,
    private confirmationService: ConfirmationService,
    private agendaService : AgendaService,
    private reorderUtils : TableReorderUtils,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.getEventTypeList();
  }

  getEventTypeList(){
    this.eventTypeList$ = this.agendaService.getEventTypeList();
  }

  onReorderDetect($event : Reorder){
    this.firstOrderedEventTypeList = $event.firstList as Rubric[];
    this.currentOrderedEventTypeList = $event.currentList as Rubric[];
    this.areThereNewEventOrderToSave = this.reorderUtils.areArraysEquals(this.firstOrderedEventTypeList, this.currentOrderedEventTypeList);
  }

  onEditEventDetect($event : number){
    const id = $event;

    this.subscriptions.push(
      this.agendaService.getEventTypeById(id).subscribe({
        next : () => {
          this.router.navigate([`agenda/modifier-type-evenement/${id}`], { queryParamsHandling: 'preserve' })
        },
        error : (err: any) => {
          this.messageService.add({severity:'error', detail: 'Erreur, contactez webmaster' });
        }
      })
    )
  }

  onDeleteEventTypeByIdDetect($event : number){
    this.confirmationService.confirm({
        message: "Voulez-vous vraiment supprimer ce type d'évênement de l'agenda?",
        accept: () => {
          const id = $event;
          this.subscriptions.push(
            this.agendaService.deleteEventType(id).subscribe({
              next : (result: any) => {
                this.getEventTypeList();
                this.messageService.add({severity:'success', detail: result.message});
              },
              error : (err) => {
                this.messageService.add({severity:'error', detail: 'Erreur système: faire appel au webmaster'});
              }
            })
          )
        },
        reject: (type: any) => {
          switch(type) {
            case ConfirmEventType.REJECT:
               this.messageService.add({severity:'info', detail:'Suppression annulée'});
            break;
          }
        }
    })
  }

  setNewItemsOrder(): void {
    const newEventTypesOrder = this.reorderUtils.findDifferentIdsAndIndices(this.firstOrderedEventTypeList, this.currentOrderedEventTypeList);
    this.agendaService.updateEventRubricsOrder(newEventTypesOrder).subscribe( {
      next : (res : any) => {
        this.messageService.add({severity:'success', detail: res});
      },
      error : (err : any) => {
        this.messageService.add({severity:'error', detail: err});
      },
      complete : () => {
        this.getEventTypeList();
        this.areThereNewEventOrderToSave = false;
      }
    })
  }

  ngOnDestroy(): void {
    this.subscriptions.forEach(sub => sub.unsubscribe());
  }

}
