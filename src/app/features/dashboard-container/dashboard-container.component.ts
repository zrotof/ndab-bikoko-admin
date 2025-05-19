import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { UntypedFormBuilder } from '@angular/forms';
import { TopHeader } from 'src/app/shared/models/top-header';
import { PageTopHeaderComponent } from '../../shared/components/page-top-header/page-top-header.component';

@Component({
    selector: 'app-dashboard-container',
    templateUrl: './dashboard-container.component.html',
    styleUrls: ['./dashboard-container.component.scss'],
    encapsulation: ViewEncapsulation.None,
    imports: [PageTopHeaderComponent]
})
export class DashboardContainerComponent implements OnInit {

  //Used to store header Data
  topHeaderPageData : TopHeader = { title : "Tableau de Board", description : "Quelques métriques clés de Ndab Bikokoo"};
  
  constructor( private fb: UntypedFormBuilder ) {}

  ngOnInit(): void {
  }

}
