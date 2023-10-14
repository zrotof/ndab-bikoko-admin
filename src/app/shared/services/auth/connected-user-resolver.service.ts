import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, Resolve, RouterStateSnapshot } from '@angular/router';
import { Observable, map} from 'rxjs';
import { AuthService } from './auth.service';
import { UsersService } from '../users/users.service';

@Injectable({
  providedIn: 'root'
})

export class ConnectedUserResolverService implements Resolve<any> {

  constructor( private authService : AuthService, private userService : UsersService ) { }

  resolve(activatedRouteSnapshot: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<any> {
    const userId = this.authService.getConnectedUserId()
    return this.userService.getUserById(userId).pipe(
      map((res: {status: string, data: any, message: string})=> res.data )
    )
  }
}