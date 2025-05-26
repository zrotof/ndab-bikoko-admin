import { NgOptimizedImage } from '@angular/common';
import { Component, input, output, ViewEncapsulation } from '@angular/core';
import { MessageService, ConfirmationService } from 'primeng/api';
import { ConfirmDialogModule } from 'primeng/confirmdialog';
import { OverlayPanelModule } from 'primeng/overlaypanel';
import { TableModule } from 'primeng/table';
import { ToastModule } from 'primeng/toast';

@Component({
  selector: 'app-testimony-list',
  templateUrl: './testimony-list.component.html',
  styleUrl: './testimony-list.component.scss',
  encapsulation: ViewEncapsulation.None,
  providers: [MessageService, ConfirmationService],
  imports: [
    TableModule,
    NgOptimizedImage,
    ConfirmDialogModule,
    ToastModule,
    OverlayPanelModule,
  ]
})

export class TestimonyListComponent {
  testimonies = input<any>();

  editTestimonyEventTrigger = output<string>();
  deleteTestimonyEventTrigger = output<any>();

  editTestimony(testimonyId: any) {

  }

  deleteTestimony(testimonyId: any) {

  }
}
