import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ArticleRubricListContainerComponent } from './components/article-rubric-list-container/article-rubric-list-container.component';
import { ArticleListContainerComponent } from './components/article-list-container/article-list-container.component';
import { ArticleAddEditContainerComponent } from './components/article-add-edit-container/article-add-edit-container.component';
import { ArticleRubricAddEditContainerComponent } from './components/article-rubric-add-edit-container/article-rubric-add-edit-container.component';

const routes: Routes = [
  {
    path: "liste-par-type-de-rubrique",
    component : ArticleListContainerComponent
  },
  {
    path: "creer-article",
    component : ArticleAddEditContainerComponent
  },
  {
    path: "modifier-article/:id",
    component : ArticleAddEditContainerComponent
  },
  {
    path: "liste-rubriques",
    component : ArticleRubricListContainerComponent
  },
  {
    path: "creer-rubrique",
    component : ArticleRubricAddEditContainerComponent
  },
  {
    path: "modifier-rubrique/:id",
    component : ArticleRubricAddEditContainerComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ArticlesRoutingModule { }
