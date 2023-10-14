import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HeaderComponent } from './components/header/header.component';
import { SideBarNavigationComponent } from './components/side-bar-navigation/side-bar-navigation.component';
import { CoreRoutingModule } from './core-routing.module';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { DashboardContainerComponent } from './components/dashboard-container/dashboard-container.component';
import { PrimengModule } from '../shared/modules/primeng/primeng.module';
import { ReactiveFormsModule } from '@angular/forms';
import { CommonComponentsModule } from '../shared/modules/common-components/common-components.module';
import { UserConnectedMenuSideBarComponent } from './components/user-connected-menu-side-bar/user-connected-menu-side-bar.component';


@NgModule({
  declarations: [
    HeaderComponent,
    SideBarNavigationComponent,
    DashboardContainerComponent,
    UserConnectedMenuSideBarComponent
  ],
  imports: [
    CommonModule,
    CoreRoutingModule,
    FontAwesomeModule,
    PrimengModule,
    ReactiveFormsModule,
    CommonComponentsModule
  ],
  exports: [
    HeaderComponent,
    SideBarNavigationComponent
  ]
})
export class CoreModule { }
