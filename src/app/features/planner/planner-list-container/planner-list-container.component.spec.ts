import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PlannerListContainerComponent } from './planner-list-container.component';

describe('PlannerContainerComponent', () => {
  let component: PlannerListContainerComponent;
  let fixture: ComponentFixture<PlannerListContainerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PlannerListContainerComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PlannerListContainerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
