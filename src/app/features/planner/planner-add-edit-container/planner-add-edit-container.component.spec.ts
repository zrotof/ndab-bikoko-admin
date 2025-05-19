import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PlannerAddEditContainerComponent } from './planner-add-edit-container.component';

describe('PlannerAddEditContainerComponent', () => {
  let component: PlannerAddEditContainerComponent;
  let fixture: ComponentFixture<PlannerAddEditContainerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PlannerAddEditContainerComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PlannerAddEditContainerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
