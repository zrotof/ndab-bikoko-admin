import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TestimoniesListContainerComponent } from './testimonies-list-container.component';

describe('TestimoniesListContainerComponent', () => {
  let component: TestimoniesListContainerComponent;
  let fixture: ComponentFixture<TestimoniesListContainerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TestimoniesListContainerComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TestimoniesListContainerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
