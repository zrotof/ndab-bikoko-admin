import { Injectable } from '@angular/core';
import { SideBarState } from '../../models/side-bar-state';
import { BehaviorSubject, Observable, Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SideBarStateService {

  sideBarState$ : BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);

  constructor() { }

  setSideBarState( sideBarState : boolean){
    this.sideBarState$.next(sideBarState)
  }

  getSideBarState(){
    return this.sideBarState$;
  }
}
