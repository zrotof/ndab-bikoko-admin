import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, map } from 'rxjs';
import { environment } from '../../../../environments/environment'

@Injectable({
  providedIn: 'root'
})

export class AgendaService {
  
  baseUrlEventType = environment.baseUrl+"event-types/";
  baseUrlEvent = environment.baseUrl+"events/";

  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json'
    }),
  };

  constructor( private http: HttpClient ) { }

  getEventTypeList() : Observable<any>{
    return this.http.get<any>(this.baseUrlEventType).pipe(
      map(({status,data, message})=> data)
    )
  }

  getEventList(eventTypeId ?: number) : Observable<any>{
    return this.http.get<any>(`${this.baseUrlEvent}?eventTypeId=${eventTypeId}`).pipe(
      map(({status,data, message})=> data)
    )
  }

  getEventTypeById(id : string): Observable<any>{
    return this.http.get<any>(this.baseUrlEventType+`${id}`, this.httpOptions)
  }

  getEventById(id : string): Observable<any>{
    return this.http.get<any>(this.baseUrlEvent+`${id}`, this.httpOptions)
  }

  addEventType(eventType: any): Observable<any>{
    return this.http.post<any>(this.baseUrlEventType, eventType, this.httpOptions)
  }

  addEvent(event : FormData): Observable<any> {
    return this.http.post<any>(this.baseUrlEvent, event)
  }

  editEventTypeById(id: string , rubricData: any): Observable<any>{
    return this.http.put<any>(this.baseUrlEventType+`${id}`, rubricData, this.httpOptions);
  }

  editEventById(id: string , articleData: FormData): Observable<any>{
    return this.http.put<any>(this.baseUrlEvent+`${id}`, articleData);
  }

  deleteEventType(id: string): Observable<any>{
    return this.http.delete<any>(this.baseUrlEventType+`${id}`)
  }

  deleteEvent(id: string): Observable<any>{
    return this.http.delete<any>(this.baseUrlEvent+`${id}`);
  }

}
