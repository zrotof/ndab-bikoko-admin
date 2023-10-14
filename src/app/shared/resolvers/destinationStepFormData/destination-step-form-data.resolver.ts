import { Injectable } from '@angular/core';
import {
  Resolve,
  RouterStateSnapshot,
  ActivatedRouteSnapshot
} from '@angular/router';
import { Observable} from 'rxjs';
import { TourismDestinationDataService } from '../../services/tourism/tourism-destination-data/tourism-destination-data.service';

@Injectable({
  providedIn: 'root'
})

export class TourismDestinationStepFormDataResolver implements Resolve<boolean> {
  
  constructor(private tourismDestinationDataService : TourismDestinationDataService){}
  
  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean> {
    const pageName = route.routeConfig?.path; // Get the page name from the activated route
    const destinationStepData = this.tourismDestinationDataService.getTourismDestinationStepDataByPageName(pageName as string);
    return destinationStepData ? destinationStepData : null;
  }
}
