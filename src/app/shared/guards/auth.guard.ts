import { Injectable } from '@angular/core';
import { Router, CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import * as moment from 'moment';
import { AuthService } from '../services/auth/auth.service';
import { User } from '../models/user';

@Injectable({ providedIn: 'root' })
export class AuthGuard implements CanActivate {
    constructor(
        private router: Router,
        private authService: AuthService
    ) { }

    canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
        
        let status !: boolean;

        this.authService.isLogged$.subscribe( res => {
            if(res === true){
                    if( route.url.length != 0 && route?.url[0].path === 'se-connecter'){
                        //Redirect to homapage in case of user logged in but try to navigate on login page
                        this.router.navigate(['/']);
                    }
        
                    let user !: User;

                    this.authService.user$.subscribe( res => {
                        user = res 
                        const allowAccess = this.accessAllowed(route.data.roles, user.roles);
                        
                        if(!allowAccess){
                            //Redirect in case of unauthaurized user 
                            this.router.navigate(['/non-autorise']);
                            status = false;
                        }else{
                            // authorised so return true
                            status = true;
                        }
                    });
            }
            else{

                if(route.routeConfig?.path === 'mot-de-passe-oublie'){
                    status = false;
                }
        
                // not logged in so redirect to login page with the return url
                this.router.navigate(['/se-connecter']);
                status = false;
            }
        })

        return status
    }

    //Check if the user roles can permit him to navigate to a route
    accessAllowed(routeRoles: string[], userRoles : string[]) : boolean{
        if(routeRoles?.length === 0) return true;

        let result = false;

        routeRoles?.forEach( routeRole => {
          if(userRoles.includes(routeRole)){
            result = true;
          }
        })

        return result;
    }

}