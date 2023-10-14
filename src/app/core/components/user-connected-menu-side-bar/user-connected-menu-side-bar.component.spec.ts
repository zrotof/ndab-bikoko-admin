import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UserConnectedMenuSideBarComponent } from './user-connected-menu-side-bar.component';

describe('UserConnectedMenuSideBarComponent', () => {
  let component: UserConnectedMenuSideBarComponent;
  let fixture: ComponentFixture<UserConnectedMenuSideBarComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ UserConnectedMenuSideBarComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(UserConnectedMenuSideBarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
