import { Injectable } from '@angular/core';
import { Resolve } from '@angular/router';
import { Observable } from 'rxjs';
import { ReplayService } from './replay.service';

@Injectable({
  providedIn: 'root'
})

export class ReplayResolverService implements Resolve<any> {

  constructor( private replayService: ReplayService ) { }

  resolve(): Observable<any> {
    return this.replayService.getListOfReplaysOnYoutube();
  }
}
