import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, map} from 'rxjs';
import { environment } from '../../../../environments/environment'

@Injectable({
  providedIn: 'root'
})
export class StatisticsService {

  baseUrlStatistics = environment.baseUrl+"statistics/"
  constructor( private http : HttpClient) { }

  getDBSize() : Observable<any>{
    return this.http.get<any>(this.baseUrlStatistics+"database").pipe(
      map((res :{success:Boolean, message : any}) => res.message),
    )
  }
}
