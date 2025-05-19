import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InitResetPasswordComponent } from './init-reset-password.component';

describe('InitResetPasswordComponent', () => {
  let component: InitResetPasswordComponent;
  let fixture: ComponentFixture<InitResetPasswordComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
    imports: [InitResetPasswordComponent]
})
    .compileComponents();

    fixture = TestBed.createComponent(InitResetPasswordComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
