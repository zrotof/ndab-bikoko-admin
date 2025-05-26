import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TestimonyAddEditContainerComponent } from './testimony-add-edit-container.component';

describe('TestimonyAddEditContainerComponent', () => {
  let component: TestimonyAddEditContainerComponent;
  let fixture: ComponentFixture<TestimonyAddEditContainerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TestimonyAddEditContainerComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TestimonyAddEditContainerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
