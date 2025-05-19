import { Component, inject, OnInit } from '@angular/core';
import { PageTopHeaderComponent } from "../../shared/components/page-top-header/page-top-header.component";
import { RubricListContainerComponent } from "./components/rubric-list-container/rubric-list-container.component";
import { BlogService } from 'src/app/core/services/blog/blog.service';
import { ArticlesListContainerComponent } from './components/articles-list-container/articles-list-container.component';

@Component({
  selector: 'app-article-list-container',
  imports: [
    PageTopHeaderComponent,
    RubricListContainerComponent,
    ArticlesListContainerComponent
  ],
  templateUrl: './article-list-container.component.html',
  styleUrl: './article-list-container.component.scss'
})

export class ArticleListContainerComponent implements OnInit {
  private blogService = inject(BlogService);

  protected rubrics: any;
  protected articles: any;

  topHeaderPageData = { title: "Articles", description: "Gestion des articles de blog" }

  ngOnInit(): void {
    this.getRubrics();
  }

  getRubrics(): void {
    this.blogService.getBlogRubrics().subscribe({
      next: (res: any) => {
        this.rubrics = res
      }
    })
  }

  getBlogArticlesByRubricId(rubricId: string): void {
    this.blogService.getBlogArticlesByRubricId(rubricId).subscribe({
      next: (res: any) => {
        this.articles = res
      }
    })
  }

  onChooseRubricEventHandler(rubricId: any) {
    this.rubrics = this.rubrics.map((rubric: any) => ({
      ...rubric,
      isActive: rubric.id === rubricId
    }));

    this.getBlogArticlesByRubricId(rubricId)
  }

  editArticle(articleId: any) {

    /*
    this.articleService.getArticleById(articleId)
      .subscribe(
        (result: any) => {

          if (result.status === "success") {
            this.router.navigate([`articles/modifier-article/${articleId}`], { queryParamsHandling: 'preserve' })
          }

          else {
            this.messageService.add({ severity: 'warn', detail: result.message });
          }

        },
        (err) => {
          this.messageService.add({ severity: 'error', detail: 'Erreur, contactez webmaster' });
        }
      )

      */
  }

  deleteArticle(articleId: string, rubricId: string) {
    /*
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
        switch (type) {
          case ConfirmEventType.REJECT:
            this.messageService.add({ severity: 'info', detail: 'Suppression annulée' });
            break;
        }
      }
    }
    )
    */
  }
}
