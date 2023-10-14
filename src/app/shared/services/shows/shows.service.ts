import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Show } from '../../models/show';
import { environment } from '../../../../environments/environment'


@Injectable({
  providedIn: 'root'
})

export class ShowsService {

  baseUrlShow = environment.baseUrl+"shows/";
  
  constructor(private http : HttpClient) { }

  getShowsListByType( type : string) : Observable<any> {
    return this.http.get<any>(this.baseUrlShow+`list?type=${type}`);
  }

  getShow(id: string): Observable<Show>{
    return this.http.get<Show>(this.baseUrlShow+`${id}`);
  }

  addShow(show: FormData): Observable<any>{
    return this.http.post<any>(this.baseUrlShow, show);
  }

  editShow(id: string ,show: FormData): Observable<any>{
    return this.http.put<any>(this.baseUrlShow+`${id}`, show );
  }

  deleteShow(id: string): Observable<any>{
    return this.http.delete<any>(this.baseUrlShow+`${id}`);
  }
}
