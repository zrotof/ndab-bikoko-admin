import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RubricListContainerComponent } from './rubric-list-container.component';

describe('RubricListContainerComponent', () => {
  let component: RubricListContainerComponent;
  let fixture: ComponentFixture<RubricListContainerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RubricListContainerComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(RubricListContainerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
