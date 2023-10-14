import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, delay, map, Observable, of, Subject, Subscription, tap, throwError } from 'rxjs';
import { User } from '../../models/user';
import { Router } from '@angular/router';
import { environment } from '../../../../environments/environment'
import * as JWT from 'jwt-decode';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

    user$ = new Subject<User>();
    isLogged$ : BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);
    expirationTime !: number;

    tokenSubscription = new Subscription();
    tokenTimer : any;
    userId : any;

    baseUrlAuth = environment.baseUrl+"users/"

    httpOptions = {
        headers: new HttpHeaders({
          'Content-Type': 'application/json'
        }),
    };

    constructor(
        private router : Router, 
        private http : HttpClient
    ) 
    { }

    login(loginData : any): Observable<any>{
        return this.http.post<any>(this.baseUrlAuth+'login/', loginData, this.httpOptions).pipe(
            map( (res : {status: string,data: any, message: string}) => res.data),
            tap(res => this.setTokenToLocalStorage(res)),
            tap(res => this.setExpirationCounter(res))
        )
    }

    // By removing the token from localStorage, we have essentially "lost" our
    // JWT in space and will need to re-authenticate with the Express app to get
    // another one.
    logout(){
        localStorage.removeItem("token");

        //emit false so that he whole app would be awared
        this.isLogged$.next(false);
        clearTimeout(this.tokenTimer);
        this.router.navigate(["/se-connecter"]);
    }

    getConnectedUserId(){
        const token = this.getToken();
        const payload : {exp: Number, iat: Number, sub: any } = JWT.default(token);
        return payload.sub as string;
    }

    private setTokenToLocalStorage(token: string){
        localStorage.setItem('token', token);
    }

    getToken() : string{
        return localStorage.getItem("token") as string;
    }

    // Returns true as long as the current time is less than the expiry date
    setExpirationCounter(token: string) {
        const payload : {exp: Number, iat: Number, sub: any } = JWT.default(token);
        const connectedExpirationTime = payload.exp as number;
        const timeout = connectedExpirationTime - Date.now() ;
        
        this.tokenTimer = setTimeout(()=>{
            this.logout();
        }, timeout)
    }

}