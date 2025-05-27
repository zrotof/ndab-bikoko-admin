import { HttpClient, HttpHeaders } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { map, Observable, of } from 'rxjs';
import { environment } from '../../../../environments/environment'

@Injectable({
  providedIn: 'root'
})
export class TestimonyService {

  private http = inject(HttpClient)

  private readonly testimonyBaseUrl = environment.baseUrl + "testimonies";

   httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json'
    })
  };

  addTestimony(testimonyToSave: FormData): Observable<any>{
    return this.http.post<any>(this.testimonyBaseUrl, testimonyToSave)
  }

  editTestimony(id: string , testimonyData: FormData): Observable<any>{
    return this.http.put<any>(this.testimonyBaseUrl+`/${id}`, testimonyData);
  }

  deleteTestimonyById(id: number): Observable<any>{
    return this.http.delete<any>(this.testimonyBaseUrl+`/${id}`)
  }

  getTestimonyById(id : string): Observable<any>{
    return this.http.get<any>(this.testimonyBaseUrl+`/${id}`, this.httpOptions)
  }

  getTestimoniesList() : Observable<any>{
    return this.http.get<any>(this.testimonyBaseUrl).pipe(
      map(({status,data, message})=> data)
    )
  }
}
