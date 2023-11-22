import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, map, tap } from 'rxjs';
import { environment } from '../../../../environments/environment'


@Injectable({
  providedIn: 'root'
})

export class ReplayService {

  addOrEdit$  = new BehaviorSubject<boolean>(true);
  
  baseUrlReplays = environment.baseUrl+"replays/";
  baseUrlYoutubeApi = environment.baseUrl+"youtube/";

  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json'
    }),
  };

  constructor( private http: HttpClient ) { }

  getReplaysList() : Observable<any>{
    return this.http.get<any>(this.baseUrlReplays).pipe(
      map(({status,data, message})=> data)
    )
  }

  getReplayById(id : number): Observable<any>{
    return this.http.get<any>(this.baseUrlReplays+`${id}`);
  }

  addReplay(replay: any): Observable<any>{
    return this.http.post<any>(this.baseUrlReplays, replay, this.httpOptions)
  }

  editReplay(id: number , replayData: any): Observable<any>{
    return this.http.put<any>(this.baseUrlReplays+`${id}`, replayData);
  }

  deleteReplay(id: number): Observable<any>{
    return this.http.delete<any>(this.baseUrlReplays+`${id}`)
  }

  getVideoListByReplayId( replayId : string ) : Observable<any>{
    return this.http.get<any>(this.baseUrlYoutubeApi+`playlists/${replayId}/videos`);
  }

  getListOfReplaysOnYoutube(): Observable<any>{
    return this.http.get<any>(this.baseUrlYoutubeApi+"playlists/");
  }

  updateReplayListOrder(ids : any) : Observable<any> {
    return this.http.put<any>(this.baseUrlReplays+'update-replay-list-order', ids).pipe(
      map(({status,data, message})=> message)
    );
  }}
