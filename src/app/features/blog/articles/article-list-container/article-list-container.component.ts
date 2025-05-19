import { Component, inject, OnInit, ViewEncapsulation } from '@angular/core';
import { RubricListContainerComponent } from "./components/rubric-list-container/rubric-list-container.component";
import { BlogService } from 'src/app/core/services/blog/blog.service';
import { ArticlesListContainerComponent } from './components/articles-list-container/articles-list-container.component';
import { PageTopHeaderComponent } from 'src/app/shared/components/page-top-header/page-top-header.component';
import { Rubric } from 'src/app/core/models/blog';
import { Router, RouterLink } from '@angular/router';
import { ConfirmationService, ConfirmEventType, MessageService } from 'primeng/api';
import { ConfirmDialogModule } from 'primeng/confirmdialog';
import { ToastModule } from 'primeng/toast';

@Component({
  selector: 'app-article-list-container',
  templateUrl: './article-list-container.component.html',
  styleUrl: './article-list-container.component.scss',
  providers: [MessageService, ConfirmationService],
  encapsulation: ViewEncapsulation.None,
  imports: [
    RouterLink,
    PageTopHeaderComponent,
    RubricListContainerComponent,
    ArticlesListContainerComponent,
    ConfirmDialogModule,
    ToastModule
  ]
})

export class ArticleListContainerComponent implements OnInit {
  private blogService = inject(BlogService);
  private router = inject(Router);
  private messageService = inject(MessageService);
  private confirmationService = inject(ConfirmationService);

  protected rubrics: any;
  protected articles: any;

  topHeaderPageData = { title: "Articles", description: "Gestion des articles de blog" }

  ngOnInit(): void {
    this.getRubrics();
  }

  getRubrics(): void {
    this.blogService.getBlogRubrics().subscribe({
      next: (res: any) => {

        this.rubrics = res.map((r: Rubric) => { return { ...r, isActive: false } });

        if(this.rubrics.length > 0){
          this.onChooseRubricEventHandler(this.rubrics[0].id)
        }
      }
    })
  }

  getBlogArticlesByRubricId(rubricId: string): void {
    this.blogService.getBlogArticleList(rubricId).subscribe({
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
    this.blogService.getBlogArticleById(articleId)
      .subscribe({
        next: (result: any) => {

          if (result.status === "success") {
            this.router.navigate([`/blog/articles/modifier/${articleId}`], { queryParamsHandling: 'preserve' })
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

  deleteArticle(event: any) {
    this.confirmationService.confirm({
      message: 'Voulez-vous vraiment supprimer cet article?',
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

        this.blogService.deleteArticle(event.articleId).subscribe({
          next: (result: any) => {
            if (result.status === "success") {
              this.getBlogArticlesByRubricId(event.rubricId)
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
