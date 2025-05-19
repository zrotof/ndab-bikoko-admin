import { Component, OnInit } from '@angular/core';
import { AsyncPipe } from '@angular/common';
import { Observable } from 'rxjs';
import { Ambassador } from 'src/app/shared/models/ambassador';
import { AmbassadorService } from 'src/app/shared/services/ambassador/ambassador.service';
import { AmbassadorListComponent } from './ambassador-list/ambassador-list.component';

@Component({
    selector: 'app-ambassador-container',
    imports: [
        AsyncPipe,
        AmbassadorListComponent
    ],
    templateUrl: './ambassador-container.component.html',
    styleUrls: ['./ambassador-container.component.scss']
})
export class AmbassadorContainerComponent implements OnInit {

  ambassadorList$ !: Observable<Ambassador[]>;

  constructor(
    private ambassadorService : AmbassadorService
  ) {}

  ngOnInit(): void {
    this.getAmbassadorList()
  }

  getAmbassadorList(){
    this.ambassadorList$ = this.ambassadorService.getAmbassadorList();
  }
}
