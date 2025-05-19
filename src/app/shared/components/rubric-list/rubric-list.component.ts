import { Component, EventEmitter, Input, OnChanges, Output, SimpleChanges, ViewEncapsulation } from '@angular/core';
import { OverlayModule } from 'primeng/overlay';
import { OverlayPanelModule } from 'primeng/overlaypanel';
import { TableModule } from 'primeng/table';
import { Reorder } from '../../models/reorder';
import { Rubric } from '../../models/rubric';

@Component({
  selector: 'app-rubric-list',
  templateUrl: './rubric-list.component.html',
  styleUrls: ['./rubric-list.component.scss'],
  encapsulation: ViewEncapsulation.None,
  imports: [
    TableModule,
    OverlayModule,
    OverlayPanelModule
  ]
})
export class RubricListComponent implements OnChanges {

  @Input() currentRubricList !: Rubric[];
  private _firstReplayList !: Rubric[];

  @Output() deleteRubricEvent = new EventEmitter<number>();
  @Output() editRubricEvent = new EventEmitter<string>();
  @Output() itemsOrderChangedEvent = new EventEmitter<Reorder>();

  //handling drag and drop functionnality
  onRowReorder() {
    const arrays: Reorder = {
      firstList: this._firstReplayList,
      currentList: this.currentRubricList
    }
    this.itemsOrderChangedEvent.emit(arrays)
  }

  editRubricEventTrigger(rubricId: string) {
    this.editRubricEvent.emit(rubricId);
  }

  deleteRubricEventTrigger(rubricId: number) {
    this.deleteRubricEvent.emit(rubricId);
  }


  ngOnChanges(changes: SimpleChanges): void {
    if (changes['currentRubricList'].currentValue) {
      this._firstReplayList = [...this.currentRubricList];
    }
  }
}
