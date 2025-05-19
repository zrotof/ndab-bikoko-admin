import { Component, EventEmitter, Input, OnChanges, Output, SimpleChanges, ViewEncapsulation } from '@angular/core';
import { CommonModule, NgClass, NgIf } from '@angular/common';
import { ConfirmDialogModule } from 'primeng/confirmdialog';
import { OverlayModule } from 'primeng/overlay';
import { OverlayPanelModule } from 'primeng/overlaypanel';
import { TableModule } from 'primeng/table';
import { ToastModule } from 'primeng/toast';
import { ConfirmationService, ConfirmEventType, MessageService } from 'primeng/api';
import { AgendaService } from 'src/app/core/services/planner/planner.service';
import { Router } from '@angular/router';
import { Rubric } from 'src/app/shared/models/rubric';
import { BehaviorSubject } from 'rxjs';
import { Reorder } from 'src/app/shared/models/reorder';

@Component({
    selector: 'app-event-type-list',
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
    providers: [MessageService, ConfirmationService],
    encapsulation: ViewEncapsulation.None
})
export class EventTypeListComponent implements OnChanges {

  @Input() currentEventlist !: Rubric[];
  private _firstEventList !: Rubric[];

  @Output() itemsOrderChangedEvent = new EventEmitter<Reorder>();
  @Output() deleteEventTypeEvent = new EventEmitter<number>();
  @Output() editEventTypeEvent = new EventEmitter<number>();

  reorderedItems : {id: number, newIndex: number}[] = [];

  private _isFirstChange = true;

  constructor(
    private messageService : MessageService, 
    private confirmationService: ConfirmationService,
    private agendaService: AgendaService,
    private router : Router
  ){}

  //handling drag and drop functionnality
  onRowReorder(event: any) {
    const arrays : Reorder = {
      firstList : this._firstEventList, 
      currentList : this.currentEventlist
    }
    this.itemsOrderChangedEvent.emit(arrays)
  }

  editRubricEventTrigger(rubricId : number){
    this.editEventTypeEvent.emit(rubricId);
  }

  deleteRubricEventTrigger(rubricId: number){
    this.deleteEventTypeEvent.emit(rubricId);
  }

  ngOnChanges(changes: SimpleChanges): void {
    if(changes['currentEventlist'].currentValue){
      this._firstEventList = [...this.currentEventlist];
    }
  }
}


