import { NgOptimizedImage } from '@angular/common';
import { Component, input, output, ViewEncapsulation } from '@angular/core';
import { OverlayModule } from 'primeng/overlay';
import { OverlayPanelModule } from 'primeng/overlaypanel';
import { TableModule } from 'primeng/table';

@Component({
  selector: 'app-planner-list',
  templateUrl: './planner-list.component.html',
  styleUrl: './planner-list.component.scss',
  encapsulation: ViewEncapsulation.None,
  imports: [
    NgOptimizedImage,
    TableModule,
    OverlayModule,
    OverlayPanelModule,
  ],
})

export class PlannerListComponent {

  planners = input<any>();

  editPlannerEventTrigger = output<string>();
  deletePlannerEventTrigger = output<any>();

  editPlanner(plannerId: any) {
    this.editPlannerEventTrigger.emit(plannerId)
  }

  deletePlanner(plannerId: string) {
    this.deletePlannerEventTrigger.emit(plannerId)
  }
}
