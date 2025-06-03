import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PhoneNumberItemsComponent } from './phone-number-items.component';

describe('PhoneNumberItemsComponent', () => {
  let component: PhoneNumberItemsComponent;
  let fixture: ComponentFixture<PhoneNumberItemsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PhoneNumberItemsComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PhoneNumberItemsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
