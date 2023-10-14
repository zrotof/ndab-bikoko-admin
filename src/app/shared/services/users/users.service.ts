import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, map, Observable, of, tap } from 'rxjs';
import { User } from '../../models/user';
import { environment } from '../../../../environments/environment'
@Injectable({
  providedIn: 'root'
})

export class UsersService {

  baseUrlUser = environment.baseUrl+"users/";
  
  constructor(private http : HttpClient) { }

  getUsersList() : Observable<any> {
    return this.http.get<any>(this.baseUrlUser).pipe(
    map(({status,data, message})=> data),
    map( data => data.map( 
      (user : any) => 
        {
          return {
            ...user,
            roles : user.roles.split("|")
          }
        }
      )
    ))
  }

  getUserById(id: string): Observable<any>{
    return this.http.get<any>(this.baseUrlUser+`${id}`).pipe(
      map( ({status,data, message}) =>  
        {
          return {
            status,
            data : {
              ...data,
              roles: (data.roles as any).split("|")
            },
            message
          }
        }
      )
    )
  }

  addUser(user: any): Observable<any>{
    return this.http.post<any>(this.baseUrlUser, user);
  }

  editUser(id: string , user: any): Observable<any>{
    return this.http.put<any>(this.baseUrlUser+`${id}`, user );
  }

  deleteUser(id: string): Observable<any>{
    return this.http.delete<any>(this.baseUrlUser+`${id}`);
  }

  //Initialisation de la procédure de de changement de mot de passe
  initResetPassport( email : string) : Observable<any>{
    return this.http.post<any>(this.baseUrlUser+'init-password-reset', email);
  } 

  //Changement de mot de passe
  resetPassport(userId: string, token: string, password : string) : Observable<any>{
    
    const objectRequest = {
      userId : userId,
      token : token,
      password : password
    };

    return this.http.post<any>(this.baseUrlUser+'reset-password', objectRequest);
  }
}
