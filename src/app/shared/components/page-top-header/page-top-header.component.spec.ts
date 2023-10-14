import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PageTopHeaderComponent } from './page-top-header.component';

describe('PageTopHeaderComponent', () => {
  let component: PageTopHeaderComponent;
  let fixture: ComponentFixture<PageTopHeaderComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PageTopHeaderComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PageTopHeaderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
