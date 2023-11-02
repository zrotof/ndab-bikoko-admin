import { Component, HostListener, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { SideBarStateService } from './shared/services/side-bar-state/side-bar-state.service';
import { AuthService } from './shared/services/auth/auth.service';
import { UsersService } from './shared/services/users/users.service';
import * as JWT from 'jwt-decode';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  
  title = 'Amadou BÂ 2024';

  isUserLogged$ !: Observable<boolean>;

  isSideNavToggled !: boolean;

  screenWidth !: number;

  styleClass = '';

  currentSideBarState$ !: Observable<boolean>;

  connectedUserId !: string;

  constructor(
    private authService : AuthService,
    private userService : UsersService,
    private sidebarStateService : SideBarStateService
  ){}

  ngOnInit(): void {
    this.initAppOnReload();
    this.onResize();
    this.getSideBarState();
    this.isUserLogged$ = this.authService.isLogged$
  }

  onSideBarToggled(){
    this.isSideNavToggled = !this.isSideNavToggled;
    this.sidebarStateService.setSideBarState(this.isSideNavToggled)
  }

  onGetCssClass( sideNavState : boolean, screenWidth : number){
    if(sideNavState === false && screenWidth > 768){
      this.styleClass = 'wrapper-not-toggled'
    }

    else if(sideNavState === true && screenWidth > 768){
      this.styleClass = 'wrapper-toggled'
    }

    else if(sideNavState === true && screenWidth <= 768 && screenWidth > 0){
      this.styleClass = 'wrapper-toggled'
    }

  }

  @HostListener('window:resize', ['$event'])
  onResize(){
    this.screenWidth = window.innerWidth;
  
    if(this.screenWidth <= 768){
      this.isSideNavToggled = true;
    }
    else{
      if(!this.isSideNavToggled){
        this.isSideNavToggled = false
      }
    }
    
    this.onGetCssClass(this.isSideNavToggled, this.screenWidth);
    this.sidebarStateService.setSideBarState(this.isSideNavToggled)
  }

  getSideBarState(){
    this.sidebarStateService.getSideBarState().subscribe({
      next : (res: boolean) => {
        this.isSideNavToggled = res;
        this.onGetCssClass(this.isSideNavToggled, this.screenWidth);
      }
    })
  }

  initAppOnReload(){
    
    const token = this.authService.getToken();

    if(token){

      const payload : {exp: number, iat: number, sub: string } = JWT.default(token);
      
      const connectedUserId = payload.sub ;
      let timeout = payload.exp - payload.iat ;

      if(timeout > 0){
        this.setConnectedUser(connectedUserId)
        this.authService.isLogged$.next(true);
        this.authService.setExpirationCounter(timeout);
      }
    }
  }

  setConnectedUser(userId : string){
    this.userService.getUserById(userId).subscribe(
      res => {
        this.authService.user$.next(res.data);
      }
    )
  }
}

