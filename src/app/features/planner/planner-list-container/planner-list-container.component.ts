import { AsyncPipe } from '@angular/common';
import { Component, inject, ViewEncapsulation } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { PlannerService } from 'src/app/core/services/planner/planner.service';
import { PageTopHeaderComponent } from 'src/app/shared/components/page-top-header/page-top-header.component';
import { PlannerListComponent } from './components/planner-list/planner-list.component';
import { ConfirmationService, ConfirmEventType, MessageService } from 'primeng/api';
import { ConfirmDialogModule } from 'primeng/confirmdialog';
import { ToastModule } from 'primeng/toast';


@Component({
  selector: 'app-planner-list-container',
  templateUrl: './planner-list-container.component.html',
  styleUrl: './planner-list-container.component.scss',
  providers: [MessageService, ConfirmationService],
  encapsulation: ViewEncapsulation.None,

  imports: [
    AsyncPipe,
    RouterLink,
    PageTopHeaderComponent,
    PlannerListComponent,
    ConfirmDialogModule,
    ToastModule
  ]
})

export class PlannerListContainerComponent {

  protected readonly plannerService = inject(PlannerService);
  protected readonly router = inject(Router);
  
  private messageService = inject(MessageService);
  private confirmationService = inject(ConfirmationService);

  topHeaderPageData = { title: "Évênement", description: "Gestion des évènements" }

  planners$ = this.plannerService.getPlannerList();


  editPlanner(event: any) {
    const plannerId = event;
    this.plannerService.getPlannerById(plannerId)
      .subscribe({
        next: (result: any) => {

          if (result.status === "success") {
            this.router.navigate([`/evenements/modifier/${plannerId}`], { queryParamsHandling: 'preserve' })
          }

          else {
            this.messageService.add({ severity: 'warn', detail: result.message });
          }

        },
        error: (err) => {
          this.messageService.add({ severity: 'error', detail: 'Erreur, contactez webmaster' });
        }
      }

      )
  }

  deletePlanner(event: any) {
    const plannerId = event;

    this.confirmationService.confirm({
      message: 'Voulez-vous vraiment supprimer cet évênement?',
      rejectButtonProps: {
        label: 'Annuler',
        icon: 'pi pi-times',
        outlined: true,
        size: 'small'
      },
      acceptButtonProps: {
        label: 'Supprimer',
        icon: 'pi pi-trash',
        size: 'small'
      },
      accept: () => {

        this.plannerService.deletePlanner(plannerId).subscribe({
          next: (result: any) => {
            if (result.status === "success") {
              this.planners$ = this.plannerService.getPlannerList();
              this.messageService.add({ severity: 'success', detail: result.message });
            }
            else {
              this.messageService.add({ severity: 'error', detail: result.message });
            }
          },
          error: (err: any) => {
            this.messageService.add({ severity: 'error', detail: 'Erreur système: faire appel au webmaster' });
          }
        })
      },
      reject: (type: any) => {
        switch (type) {
          case ConfirmEventType.REJECT:
            this.messageService.add({ severity: 'info', detail: 'Suppression annulée' });
            break;
        }
      }
    }
    )
  }
}
