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
    baseUrlAuth = environment.baseUrl+"users/"

    isLogged$ : BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);
    user$ = new Subject<User>();

    private _logoutTimeout: ReturnType<typeof setTimeout> | null = null;

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
            tap(res => {
                const payload : {exp: number, iat: number, sub: string } = JWT.default(res);
                const timeout = payload.exp - payload.iat ;
                console.log("payload.exp - payload.iat : ", payload.exp - payload.iat)
                this.setExpirationCounter(timeout)
            }),
        )
    }

    // By removing the token from localStorage, we have essentially "lost" our
    // JWT in space and will need to re-authenticate with the Express app to get
    // another one.
    logout(){
        localStorage.removeItem("token");
        //emit false so that he whole app would be awared
        this.isLogged$.next(false);
        this.clearLogoutTimeout();
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
    setExpirationCounter(timeout: number) {
        
        const remainingTimeInMilliseconds = timeout*1000;

        this.clearLogoutTimeout();

        this._logoutTimeout = setTimeout(() => {
            this.logout();
          }, remainingTimeInMilliseconds);
    }

    // Function to clear the logout timeout
    private clearLogoutTimeout() {
        if (this._logoutTimeout) {
        clearTimeout(this._logoutTimeout);
        this._logoutTimeout = null;
        }
    }
}