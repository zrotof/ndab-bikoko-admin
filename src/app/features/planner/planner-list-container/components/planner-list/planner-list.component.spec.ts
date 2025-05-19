import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PlannerListComponent } from './planner-list.component';

describe('PlannerListComponent', () => {
  let component: PlannerListComponent;
  let fixture: ComponentFixture<PlannerListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PlannerListComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PlannerListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
