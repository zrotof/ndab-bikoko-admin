import { Component, Input } from '@angular/core';
import { TopHeader } from '../../models/top-header';

@Component({
    selector: 'app-page-top-header',
    templateUrl: './page-top-header.component.html',
    styleUrls: ['./page-top-header.component.scss']
})

export class PageTopHeaderComponent {

  @Input() topHeaderData !: TopHeader;
}
