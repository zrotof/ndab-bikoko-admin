import { AsyncPipe } from '@angular/common';
import { Component, inject, ViewEncapsulation } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { TestimonyService } from 'src/app/core/services/testimony/testimony.service';
import { PageTopHeaderComponent } from 'src/app/shared/components/page-top-header/page-top-header.component';
import { TestimonyListComponent } from './components/testimony-list/testimony-list.component';
import { MessageService, ConfirmationService, ConfirmEventType } from 'primeng/api';
import { ConfirmDialogModule } from 'primeng/confirmdialog';
import { ToastModule } from 'primeng/toast';

@Component({
  selector: 'app-testimonies-list-container',
  templateUrl: './testimonies-list-container.component.html',
  styleUrl: './testimonies-list-container.component.scss',
  providers: [MessageService, ConfirmationService],
  encapsulation: ViewEncapsulation.None,
  imports: [
    AsyncPipe,
    RouterLink,
    PageTopHeaderComponent,
    ConfirmDialogModule,
    ToastModule,
    TestimonyListComponent
  ]
})

export class TestimoniesListContainerComponent {
  private testimonyService = inject(TestimonyService);
  protected readonly router = inject(Router);
  private readonly messageService = inject(MessageService);
  private readonly confirmationService = inject(ConfirmationService);

  protected testimonies$ = this.testimonyService.getTestimoniesList();

  protected readonly topHeaderPageData = { title: "Témoignages", description: "Gestion des témoignages" }

  editTestimonyEventHandler(event: any) {
    const testimonyId = event;
    this.testimonyService.getTestimonyById(testimonyId)
      .subscribe({
        next: (result: any) => {

          if (result.status === "success") {
            this.router.navigate([`/temoignages/modifier/${testimonyId}`], { queryParamsHandling: 'preserve' })
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

  deleteTestimonyEventHandler(event: any) {
    const testimonyId = event;

    this.confirmationService.confirm({
      message: 'Voulez-vous vraiment supprimer ce témoignage ?',
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

        this.testimonyService.deleteTestimonyById(testimonyId).subscribe({
          next: (result: any) => {
            if (result.status === "success") {
              this.testimonies$ = this.testimonyService.getTestimoniesList();
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
