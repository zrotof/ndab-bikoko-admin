import { Component, input, output } from '@angular/core';
import { ConfirmDialogModule } from 'primeng/confirmdialog';
import { OverlayModule } from 'primeng/overlay';
import { OverlayPanelModule } from 'primeng/overlaypanel';
import { TableModule } from 'primeng/table';
import { ToastModule } from 'primeng/toast';

@Component({
  selector: 'app-articles-list-container',
  templateUrl: './articles-list-container.component.html',
  styleUrl: './articles-list-container.component.scss',
  imports: [
    TableModule,
    OverlayModule,
    ConfirmDialogModule,
    ToastModule,
    OverlayPanelModule,
  ]
})

export class ArticlesListContainerComponent {

  articles = input<any>();
  
  editArticleEventTrigger = output<string>();
  deleteArticleEventTrigger = output<string>();
  
  editArticle(articleId : any){
    this.editArticleEventTrigger.emit(articleId)
  }
  
    deleteArticle(articleId: string){
      this.deleteArticleEventTrigger.emit(articleId)
    }
}
