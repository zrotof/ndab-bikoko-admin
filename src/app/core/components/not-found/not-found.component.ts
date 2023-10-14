import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/shared/services/auth/auth.service';

@Component({
  selector: 'app-not-found',
  templateUrl: './not-found.component.html',
  styleUrls: ['./not-found.component.scss']
})
export class NotFoundComponent implements OnInit {

  textDisplayed !: string;
  routeToNavigateTo !: string;
  loginButtonText !: string;

  constructor(
    private authService : AuthService,
    private router : Router
  ){}

  ngOnInit(): void {
    this.setTextToDisplayAndRouteToNavigateTo();
  }

  setTextToDisplayAndRouteToNavigateTo(){
    this.authService.isLogged$.subscribe(res => {
      if(res === true){
        this.textDisplayed =  "Attention, vous essayez d'accéder à une page inexistante.";
        this.routeToNavigateTo = "/";
        this.loginButtonText = "Tableau de bord"
      }
      else{
        this.textDisplayed =  "Vous essayez d'accéder à une page sans vous être préalablement connecté. Connectez-vous d'abord et re-essayez ensuite !";
        this.routeToNavigateTo = "/se-connecter";
        this.loginButtonText = "Se connecter"
      }
    })
  }

  onNavigate(){
    this.router.navigateByUrl(this.routeToNavigateTo)
  }
}
