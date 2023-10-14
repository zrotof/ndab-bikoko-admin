import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MainActionBarComponent } from './main-action-bar.component';

describe('MainActionBarComponent', () => {
  let component: MainActionBarComponent;
  let fixture: ComponentFixture<MainActionBarComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MainActionBarComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MainActionBarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
