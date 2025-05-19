import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HeaderComponent } from './components/header/header.component';
import { SideBarNavigationComponent } from './components/side-bar-navigation/side-bar-navigation.component';
import { CoreRoutingModule } from './core-routing.module';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { DashboardContainerComponent } from '../features/dashboard-container/dashboard-container.component';

import { ReactiveFormsModule } from '@angular/forms';

import { UserConnectedMenuSideBarComponent } from './components/user-connected-menu-side-bar/user-connected-menu-side-bar.component';

@NgModule({
    imports: [
    CommonModule,
    CoreRoutingModule,
    FontAwesomeModule,
    ReactiveFormsModule,
    HeaderComponent,
    SideBarNavigationComponent,
    DashboardContainerComponent,
    UserConnectedMenuSideBarComponent
],
    exports: [
        HeaderComponent,
        SideBarNavigationComponent
    ]
})
export class CoreModule { }
