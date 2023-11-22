import { ChangeDetectionStrategy, Component, EventEmitter, Input, OnChanges, Output, SimpleChanges } from '@angular/core';
import { NgClass, NgFor, NgIf } from '@angular/common';
import { Rubric } from 'src/app/shared/models/rubric';

@Component({
  selector: 'app-category-list-menu',
  standalone: true,
  imports: [
    NgFor,
    NgIf,
    NgClass
  ],
  templateUrl: './category-list-menu.component.html',
  styleUrls: ['./category-list-menu.component.scss'],
  changeDetection: ChangeDetectionStrategy.Default,
})
export class CategoryListMenuComponent implements OnChanges {

  @Input() menuList !: Rubric[] ;
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
