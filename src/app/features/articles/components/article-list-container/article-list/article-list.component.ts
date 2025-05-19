import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Router } from '@angular/router';
import { ConfirmationService, ConfirmEventType, MessageService } from 'primeng/api';
import { DatePipe, NgClass, NgIf } from '@angular/common';
import { TableModule } from 'primeng/table';
import { OverlayModule } from 'primeng/overlay';
import { ConfirmDialogModule } from 'primeng/confirmdialog';
import { ToastModule } from 'primeng/toast';
import { OverlayPanelModule } from 'primeng/overlaypanel';
import { ArticleService } from 'src/app/shared/services/article/article.service';

@Component({
    selector: 'app-article-list',
    imports: [
        NgIf,
        TableModule,
        OverlayModule,
        ConfirmDialogModule,
        ToastModule,
        OverlayPanelModule,
        NgClass
    ],
    templateUrl: './article-list.component.html',
    styleUrls: ['./article-list.component.scss'],
    providers: [MessageService, ConfirmationService, DatePipe]
})
export class ArticleListComponent {

  @Input() articles : any;
  @Output() deleteArticleEvent = new EventEmitter<any>();

  constructor( 
    private router: Router,
    private articleService : ArticleService,
    private messageService : MessageService, 
    private confirmationService: ConfirmationService,
    private datePipe : DatePipe
  ) { }

  editArticle(articleId : any){
    this.articleService.getArticleById(articleId)
      .subscribe(
        (result : any) => {

          if(result.status === "success"){
            this.router.navigate([`articles/modifier-article/${articleId}`], { queryParamsHandling: 'preserve' })
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

  deleteArticle(articleId: string, rubricId: string){
    this.confirmationService.confirm({
      message: 'Voulez-vous vraiment supprimer cette replay?',
      accept: () => {

        const deleteObject = {
          articleId: articleId,
          rubricId: rubricId
        }
          //Emit event to do the delation
          this.deleteArticleEvent.emit(deleteObject);
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
