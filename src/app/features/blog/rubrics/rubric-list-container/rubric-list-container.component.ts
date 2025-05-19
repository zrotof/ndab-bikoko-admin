import { Component, inject, OnDestroy, OnInit, ViewEncapsulation } from '@angular/core';
import { ConfirmEventType, ConfirmationService, MessageService } from 'primeng/api';
import { AsyncPipe } from '@angular/common';
import { RubricListComponent } from '../../../../shared/components/rubric-list/rubric-list.component';
import { Router, RouterLink } from '@angular/router';
import { Observable, Subscription } from 'rxjs';
import { ArticleService } from 'src/app/shared/services/article/article.service';
import { Rubric } from 'src/app/shared/models/rubric';
import { Reorder } from 'src/app/shared/models/reorder';
import { TableReorderUtils } from 'src/app/shared/utils/table-reorder.utils';
import { DialogService } from 'primeng/dynamicdialog';
import { ToastModule } from 'primeng/toast';
import { ConfirmDialogModule } from 'primeng/confirmdialog';
import { BlogService } from 'src/app/core/services/blog/blog.service';
import { PageTopHeaderComponent } from 'src/app/shared/components/page-top-header/page-top-header.component';

@Component({
    selector: 'app-rubric-list-container',
    imports: [
        RouterLink,
        AsyncPipe,
        ToastModule,
        ConfirmDialogModule,
        PageTopHeaderComponent,
        RubricListComponent
    ],
    templateUrl: './rubric-list-container.component.html',
    styleUrls: ['./rubric-list-container.component.scss'],
    providers: [MessageService, ConfirmationService, DialogService],
    encapsulation: ViewEncapsulation.None
})
export class ArticleRubricListContainerComponent implements OnDestroy {

  private blogService = inject(BlogService);

  protected rubricList$ = this.blogService.getBlogRubrics();

  protected topHeaderPageData = { title: "Rubriques Créées", description: "Liste de toutes les rubriques d'articles" }

  private subscriptions: Subscription[] = [];
  
  firstOrderedReplayList !: Rubric[];
  currentOrderedReplayList !: Rubric[];
  areThereNewOrderToSave = false;


  constructor(
    private messageService : MessageService,
    private confirmationService: ConfirmationService,
    private reorderUtils : TableReorderUtils,
    private router: Router
  ) {}

  onReorderDetect($event : Reorder){
    this.firstOrderedReplayList = $event.firstList as Rubric[];
    this.currentOrderedReplayList = $event.currentList as Rubric[];
    this.areThereNewOrderToSave = this.reorderUtils.areArraysEquals(this.firstOrderedReplayList, this.currentOrderedReplayList);
  }

  onEditEventDetect($event : string){
    const id = $event;

    this.subscriptions.push(this.blogService.getBlogRubricById(id).subscribe({
      next: (result : any) => {

        if(result.status === "success"){
          this.router.navigate([`/blog/rubriques/modifier/${id}`], { queryParamsHandling: 'preserve' })
        }else{
          this.messageService.add({severity:'warn', detail: result.message });
        }
      },
      error : (error : any) =>{
        this.messageService.add({severity:'error', detail: 'Erreur, contactez webmaster' });
      }
    }))
  
  }

  deleteRubricById($event : number){
    this.confirmationService.confirm({
      message: "Voulez-vous vraiment supprimer cette rubrique ?",
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
        const id = $event;

        this.subscriptions.push(
          this.blogService.deleteRubric(id).subscribe({
            next : (result : any) =>{
              if(result.status === "success" ){
                this.rubricList$ = this.blogService.getBlogRubrics();
                //affichage du message lors d'un ajout sans erreur
                this.messageService.add({severity:'success', detail: result.message});
              }
              else{
                this.messageService.add({severity:'error', detail: result.message});
              }
            },
            error : (err : any) =>{
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

  setNewItemsOrder(){
    const newEventTypesOrder = this.reorderUtils.findDifferentIdsAndIndices(this.firstOrderedReplayList, this.currentOrderedReplayList);
    
  /*
    this.articleService.updateArticleRubricsOrder(newEventTypesOrder).subscribe( {
      next : (res : any) => {
        this.messageService.add({severity:'success', detail: res});
      },
      error : (err : any) => {
        this.messageService.add({severity:'error', detail: err});
      },
      complete : () => { 
        this.areThereNewOrderToSave = false;
        this.getRubricList();
      },
    })
      */
  }

  ngOnDestroy(): void {
    this.subscriptions.forEach(sub => sub.unsubscribe());
  }
}
