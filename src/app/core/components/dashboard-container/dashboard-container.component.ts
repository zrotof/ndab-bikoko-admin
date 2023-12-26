import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { UntypedFormBuilder } from '@angular/forms';
import { faCoins } from '@fortawesome/free-solid-svg-icons';

import { faPlane, faBed, faCarSide, faHome, faEllipsisV, faCubes, faChevronLeft, faChevronRight, faGlobeAfrica } from '@fortawesome/free-solid-svg-icons';
import { TopHeader } from 'src/app/shared/models/top-header';

@Component({
  selector: 'app-dashboard-container',
  templateUrl: './dashboard-container.component.html',
  styleUrls: ['./dashboard-container.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class DashboardContainerComponent implements OnInit {

  faCoins = faCoins;
  faPlane = faPlane;
  faBed = faBed;
  faCarSide = faCarSide;
  faHome = faHome;
  faEllipsisV = faEllipsisV;
  faCubes = faCubes;
  faChevronLeft = faChevronLeft;
  faChevronRight = faChevronRight;
  faGlobeAfrica = faGlobeAfrica;

  //Used to store header Data
  topHeaderPageData !: TopHeader;
  
  constructor( private fb: UntypedFormBuilder ) {}

  ngOnInit(): void {
    this.getTopHeaderPageData();
  }

  /**
   * set header data
   */
  getTopHeaderPageData() : void{
    this.topHeaderPageData = { title : "Tableau de bord", description : "Quelques métriques importantes de la campagne"}
  }

}
