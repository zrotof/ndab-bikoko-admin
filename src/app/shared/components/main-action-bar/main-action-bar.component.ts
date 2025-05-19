import { Component, Input } from '@angular/core';
import { Router } from '@angular/router';
import { Button } from '../../models/button';
import { NgFor } from '@angular/common';

@Component({
    selector: 'app-main-action-bar',
    templateUrl: './main-action-bar.component.html',
    styleUrls: ['./main-action-bar.component.scss'],
    imports: [NgFor]
})
export class MainActionBarComponent {

  constructor( private router : Router){}

  @Input() actionsButton !: Button[];

  onAddDestination(url : string) : void {
    this.router.navigateByUrl(url);
  }
}
