import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, map } from 'rxjs';
import { environment } from '../../../../environments/environment'

@Injectable({
  providedIn: 'root'
})

export class AmbassadorService {
  
  baseUrlAmbassador = environment.baseUrl+"ambassadors/";

  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json'
    }),
  };

  constructor( private http: HttpClient ) { }

  getAmbassadorList() : Observable<any>{
    return this.http.get<any>(this.baseUrlAmbassador).pipe(
      map(({status,data, message})=> data)
    )
  }

}
