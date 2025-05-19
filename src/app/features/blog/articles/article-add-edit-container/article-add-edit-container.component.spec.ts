import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ArticleAddEditContainerComponent } from './article-add-edit-container.component';

describe('ArticleAddEditContainerComponent', () => {
  let component: ArticleAddEditContainerComponent;
  let fixture: ComponentFixture<ArticleAddEditContainerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ArticleAddEditContainerComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ArticleAddEditContainerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
