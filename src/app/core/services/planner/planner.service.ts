import { HttpClient, HttpHeaders } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable, map } from 'rxjs';
import { environment } from '../../../../environments/environment'

@Injectable({
  providedIn: 'root'
})

export class PlannerService {

  private baseUrlPlanner = environment.baseUrl + "planners/";
  private http = inject(HttpClient);

  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json'
    }),
  };

  addPlanner(event: FormData): Observable<any> {
    return this.http.post<any>(this.baseUrlPlanner, event)
  }

  deletePlanner(id: string): Observable<any> {
    return this.http.delete<any>(this.baseUrlPlanner + `${id}`);
  }

  editPlannerById(id: string, articleData: FormData): Observable<any> {
    return this.http.put<any>(this.baseUrlPlanner + `${id}`, articleData);
  }

  getPlannerById(id: string): Observable<any> {
    return this.http.get<any>(this.baseUrlPlanner + `${id}`, this.httpOptions)
  }
  
  getPlannerList(): Observable<any> {
    return this.http.get<any>(this.baseUrlPlanner).pipe(
      map(({ status, data, message }) => data)
    )
  }

}
