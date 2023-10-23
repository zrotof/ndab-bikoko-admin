import { Component, EventEmitter, Input, Output } from '@angular/core';
import { CommonModule, NgClass, NgIf } from '@angular/common';
import { ConfirmationService, ConfirmEventType, MessageService } from 'primeng/api';
import { ConfirmDialogModule } from 'primeng/confirmdialog';
import { OverlayModule } from 'primeng/overlay';
import { OverlayPanelModule } from 'primeng/overlaypanel';
import { TableModule } from 'primeng/table';
import { ToastModule } from 'primeng/toast';
import { Router } from '@angular/router';
import { ArticleService } from 'src/app/shared/services/article/article.service';

@Component({
  selector: 'app-rubric-list',
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
  templateUrl: './rubric-list.component.html',
  styleUrls: ['./rubric-list.component.scss'],
  providers: [MessageService, ConfirmationService]
})
export class RubricListComponent {

  @Input() rubrics !: any;
  @Output() deleteRubricEvent = new EventEmitter<string>();

  constructor( 
    private router: Router,
    private articleService : ArticleService,
    private messageService : MessageService, 
    private confirmationService: ConfirmationService
  ){}

  editRubric(rubricId : any){
    this.articleService.getRubricById(rubricId)
      .subscribe(
        (result : any) => {

          if(result.status === "success"){
            this.router.navigate([`articles/modifier-rubrique/${rubricId}`], { queryParamsHandling: 'preserve' })
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

  deleteRubric(rubricId: string){
    this.confirmationService.confirm({
      message: "Voulez-vous vraiment supprimer cette rubrique ?",
      accept: () => {
          //Emit event to do the delation
          this.deleteRubricEvent.emit(rubricId);
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
}
