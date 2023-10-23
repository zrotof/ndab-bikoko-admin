import { Component, OnInit } from '@angular/core';
import { AsyncPipe } from '@angular/common';
import { ArticleListComponent } from './article-list/article-list.component';
import { RouterLink } from '@angular/router';
import { MessageService } from 'primeng/api';
import { Observable, filter, map } from 'rxjs';
import { ArticleService } from 'src/app/shared/services/article/article.service';
import { CategoryListMenuComponent } from '../../../../shared/components/category-list-menu/category-list-menu.component';
import { Category } from 'src/app/shared/models/category';

@Component({
  selector: 'app-article-list-container',
  standalone: true,
  imports: [
    RouterLink,
    AsyncPipe,
    CategoryListMenuComponent,
    ArticleListComponent
  ],
  templateUrl: './article-list-container.component.html',
  styleUrls: ['./article-list-container.component.scss'],
  providers: [MessageService]
})
export class ArticleListContainerComponent implements OnInit {

  rubricList$ !: Observable<Category[]>;
  articlesList$ !: Observable<any>;

  constructor(
    private articleService : ArticleService,
    private messageService : MessageService, 
  ) { }

  ngOnInit(): void {
    this.getRubricList();
  }

  getRubricList(): void {
    this.rubricList$ = this.articleService.getRubricList().pipe(
      map(result => result.map(
        (res: Category) => {
          return {
            id: res.id,
            name : res.name,
            isActive: false
          }
        })
      )
    )
  }

  getArticleListByRubricId($event: number){
    const rubricId = $event;
    this.articlesList$ = this.articleService.getArticleList(rubricId);
  }

  deleteArticleById($event : any){

    const articleId = $event.articleId;
    const rubricId = $event.rubricId
    
    this.articleService.deleteArticle(articleId)
      .subscribe(
        (result : any) =>{
          if(result.status === "success" ){
            this.getArticleListByRubricId(rubricId);
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
