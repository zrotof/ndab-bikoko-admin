import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { User } from 'src/app/shared/models/user';
import { AuthService } from 'src/app/shared/services/auth/auth.service';
import { UsersService } from 'src/app/shared/services/users/users.service';
import { NgIf, NgFor } from '@angular/common';
import { SidebarModule } from 'primeng/sidebar';
import { PrimeTemplate } from 'primeng/api';

@Component({
    selector: 'app-user-connected-menu-side-bar',
    templateUrl: './user-connected-menu-side-bar.component.html',
    styleUrls: ['./user-connected-menu-side-bar.component.scss'],
    encapsulation: ViewEncapsulation.None,
    imports: [NgIf, SidebarModule, PrimeTemplate, RouterLink, NgFor]
})
export class UserConnectedMenuSideBarComponent implements OnInit {

  user !: User;

  sideBarDisplayed : boolean = false;

  constructor(
    private authService : AuthService, 
    private router : Router) { }

  ngOnInit(): void {
    this.getConnectedUser();
  }

  getConnectedUser(){
    this.authService.user$.subscribe( res => {
      this.user = res;
    })
  }

  //Handling click on burger menu
  onUserMenuClick(){
    this.sideBarDisplayed = !this.sideBarDisplayed;
  }

  onSideBarNavigation(){
    this.sideBarDisplayed = false;
  }

  logout(){
    this.authService.logout();
    this.router.navigateByUrl('se-connecter');
  }

  getInitials(firstname: string, lastname: string){
    const fullName = firstname+' '+lastname;
    const namesBlock = fullName.split(' ');

    let initials='';

    namesBlock.forEach(nameBlock => {
      initials = initials+ nameBlock.charAt(0).toUpperCase()[0]
    })

    return initials;
  }
}
