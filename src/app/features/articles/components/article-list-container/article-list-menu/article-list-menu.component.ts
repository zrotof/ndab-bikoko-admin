import { ChangeDetectionStrategy, Component, EventEmitter, Input, OnChanges, Output, SimpleChanges } from '@angular/core';
import { NgClass, NgFor, NgIf } from '@angular/common';
import { ArticleRubric } from 'src/app/shared/models/article';

@Component({
  selector: 'app-article-list-menu',
  standalone: true,
  imports: [
    NgFor,
    NgIf,
    NgClass
  ],
  templateUrl: './article-list-menu.component.html',
  styleUrls: ['./article-list-menu.component.scss'],
  changeDetection: ChangeDetectionStrategy.Default,
})
export class ArticleListMenuComponent implements OnChanges {

  @Input() menuList !: ArticleRubric[] ;
  @Output() menuItemClikedEvent = new EventEmitter<number>();

  private isFirstChange = true;

  setActiveMenu( index : number){
    this.menuList.forEach(menu => menu.isActive = false );
    this.menuList[index].isActive = true;
  }

  getArticlesByRubricId(id: number, index: number){
    if(this.menuList[index].isActive === false){
      this.setActiveMenu(index);
      this.menuItemClikedEvent.emit(id);
    }
  }

  ngOnChanges(changes: SimpleChanges): void {
    if(changes['menuList'].currentValue && this.isFirstChange){
      this.getArticlesByRubricId(this.menuList[0].id, 0);
      this.isFirstChange = false;
    }
  }

}
