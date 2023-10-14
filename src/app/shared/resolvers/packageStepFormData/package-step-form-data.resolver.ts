import { Injectable } from '@angular/core';
import {
  Router, Resolve,
  RouterStateSnapshot,
  ActivatedRouteSnapshot
} from '@angular/router';
import { Observable, of } from 'rxjs';
import { TourismPackageDataService } from '../../services/tourism/tourism-package-data/tourism-package-data.service';

@Injectable({
  providedIn: 'root'
})
export class TourismPackageStepFormDataResolver implements Resolve<boolean> {

  constructor(private tourismPackageDataService : TourismPackageDataService){}

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean> {
    const pageName = route.routeConfig?.path; // Get the page name from the activated route
    const destinationStepData = this.tourismPackageDataService.getTourismPackageStepDataByPageName(pageName as string);
    return destinationStepData ? destinationStepData : null;
  }
}
