import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PhoneRegisterComponent } from './phone-register.component';

describe('PhoneRegisterComponent', () => {
  let component: PhoneRegisterComponent;
  let fixture: ComponentFixture<PhoneRegisterComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PhoneRegisterComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PhoneRegisterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
