import { Component, OnInit } from '@angular/core';
import { MessageService } from 'primeng/api';
import { AsyncPipe } from '@angular/common';
import { RubricListComponent } from './rubric-list/rubric-list.component';
import { RouterLink } from '@angular/router';
import { Observable } from 'rxjs';
import { ArticleService } from 'src/app/shared/services/article/article.service';

@Component({
  selector: 'app-article-rubric-list-container',
  standalone: true,
  imports: [
    RouterLink,
    AsyncPipe,
    RubricListComponent
  ],
  templateUrl: './article-rubric-list-container.component.html',
  styleUrls: ['./article-rubric-list-container.component.scss'],
  providers: [MessageService]
})
export class ArticleRubricListContainerComponent implements OnInit {

  rubricList$ !: Observable<any>;

  constructor(
    private articleService : ArticleService,
    private messageService : MessageService, 
  ) {}

  ngOnInit(): void {
    this.getRubricList()
  }

  getRubricList(){
    this.rubricList$ = this.articleService.getRubricList();
  }

  deleteReplayById($event : string){

    const rubricId = $event;

    this.articleService.deleteRubric(rubricId)
      .subscribe(
        (result : any) =>{
          console.log(result)
          if(result.status === "success" ){
            this.getRubricList();
            //affichage du message lors d'un ajout sans erreur
            this.messageService.add({severity:'success', detail: result.message});
          }
          else{
            this.messageService.add({severity:'error', detail: result.message});
          }
        },
        (err) =>{
          this.messageService.add({severity:'error', detail: 'Erreur système: faire appel au webmaster'});
        }
      )
  }
}
