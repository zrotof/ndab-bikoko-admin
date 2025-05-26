import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TestimonyListComponent } from './testimony-list.component';

describe('TestimonyListComponent', () => {
  let component: TestimonyListComponent;
  let fixture: ComponentFixture<TestimonyListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TestimonyListComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TestimonyListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
