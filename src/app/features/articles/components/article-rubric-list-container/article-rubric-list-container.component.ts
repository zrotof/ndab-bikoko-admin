import { Component, OnDestroy, OnInit, ViewEncapsulation } from '@angular/core';
import { ConfirmEventType, ConfirmationService, MessageService } from 'primeng/api';
import { AsyncPipe, NgIf } from '@angular/common';
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

@Component({
    selector: 'app-article-rubric-list-container',
    imports: [
        RouterLink,
        AsyncPipe,
        NgIf,
        ToastModule,
        ConfirmDialogModule,
        RubricListComponent
    ],
    templateUrl: './article-rubric-list-container.component.html',
    styleUrls: ['./article-rubric-list-container.component.scss'],
    providers: [MessageService, ConfirmationService, DialogService],
    encapsulation: ViewEncapsulation.None
})
export class ArticleRubricListContainerComponent implements OnInit, OnDestroy {

  rubricList$ !: Observable<Rubric[]>;

  private subscriptions: Subscription[] = [];
  
  firstOrderedReplayList !: Rubric[];
  currentOrderedReplayList !: Rubric[];
  areThereNewOrderToSave = false;


  constructor(
    private articleService : ArticleService,
    private messageService : MessageService,
    private confirmationService: ConfirmationService,
    private reorderUtils : TableReorderUtils,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.getRubricList()
  }

  getRubricList(){
    this.rubricList$ = this.articleService.getRubricList();
  }

  onReorderDetect($event : Reorder){
    this.firstOrderedReplayList = $event.firstList as Rubric[];
    this.currentOrderedReplayList = $event.currentList as Rubric[];
    this.areThereNewOrderToSave = this.reorderUtils.areArraysEquals(this.firstOrderedReplayList, this.currentOrderedReplayList);
  }

  onEditEventDetect($event : number){
    const id = $event;
    
    this.subscriptions.push(this.articleService.getRubricById(id).subscribe({
      next: (result : any) => {

        if(result.status === "success"){
          this.router.navigate([`articles/modifier-rubrique/${id}`], { queryParamsHandling: 'preserve' })
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
      accept: () => {
        const id = $event;

        this.subscriptions.push(
          this.articleService.deleteRubric(id).subscribe({
            next : (result : any) =>{
              if(result.status === "success" ){
                this.getRubricList();
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
  }

  ngOnDestroy(): void {
    this.subscriptions.forEach(sub => sub.unsubscribe());
  }
}
