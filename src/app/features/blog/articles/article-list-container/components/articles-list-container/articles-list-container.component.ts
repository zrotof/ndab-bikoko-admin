import { DatePipe, NgOptimizedImage } from '@angular/common';
import { Component, input, output, ViewEncapsulation } from '@angular/core';
import { MessageService, ConfirmationService } from 'primeng/api';
import { ConfirmDialogModule } from 'primeng/confirmdialog';
import { OverlayModule } from 'primeng/overlay';
import { OverlayPanelModule } from 'primeng/overlaypanel';
import { TableModule } from 'primeng/table';
import { ToastModule } from 'primeng/toast';

@Component({
  selector: 'app-articles-list-container',
  templateUrl: './articles-list-container.component.html',
  styleUrl: './articles-list-container.component.scss',
  encapsulation: ViewEncapsulation.None,
  providers: [MessageService, ConfirmationService, DatePipe],
  imports: [
    NgOptimizedImage,
    DatePipe,
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
  deleteArticleEventTrigger = output<any>();
  
  editArticle(articleId : any){
    this.editArticleEventTrigger.emit(articleId)
  }
  
    deleteArticle(articleId: string, rubricId: string){
      this.deleteArticleEventTrigger.emit({articleId, rubricId})
    }
}
