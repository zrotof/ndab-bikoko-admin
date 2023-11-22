import { Component, EventEmitter, Input, Output, SimpleChanges, ViewEncapsulation } from '@angular/core';
import { ConfirmationService, MessageService } from 'primeng/api';
import { Replay } from 'src/app/shared/models/replay';
import { NgClass, NgIf } from '@angular/common';
import { TableModule } from 'primeng/table';
import { OverlayModule } from 'primeng/overlay';
import { OverlayPanelModule } from 'primeng/overlaypanel';
import { Reorder } from 'src/app/shared/models/reorder';

@Component({
  selector: 'app-replay-list',
  standalone: true,
  imports : [
    NgIf,
    TableModule,
    OverlayModule,
    OverlayPanelModule,
    NgClass
  ],
  templateUrl: './replay-list.component.html',
  styleUrls: ['./replay-list.component.scss'],
  providers: [MessageService, ConfirmationService],
  encapsulation: ViewEncapsulation.None
})
export class ReplayListComponent{

  @Input() currentReplayList !: Replay[];
  private _firstreplayList !: Replay[];

  @Output() editReplayTypeEvent = new EventEmitter<number>();
  @Output() deleteReplayEvent = new EventEmitter<number>();
  @Output() itemsOrderChangedEvent = new EventEmitter<Reorder>();

  //handling drag and drop functionnality
  onRowReorder() {
    const arrays : Reorder = {
      firstList : this._firstreplayList, 
      currentList : this.currentReplayList
    }
    this.itemsOrderChangedEvent.emit(arrays)
  }

  editReplayEventTrigger(id : number){
    this.editReplayTypeEvent.emit(id);
  }

  deleteReplayEventTrigger(replayId: number){
    this.deleteReplayEvent.emit(replayId);
  }
  
  ngOnChanges(changes: SimpleChanges): void {
    if(changes['currentReplayList'].currentValue){
      this._firstreplayList = [...this.currentReplayList];
    }
  }
}
