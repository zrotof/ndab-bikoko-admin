import { Component, Input } from '@angular/core';
import { CommonModule, NgIf } from '@angular/common';
import { Ambassador } from 'src/app/shared/models/ambassador';
import { TableModule } from 'primeng/table';

@Component({
  selector: 'app-ambassador-list',
  standalone: true,
  imports: [
    TableModule,
    NgIf
  ],
  templateUrl: './ambassador-list.component.html',
  styleUrls: ['./ambassador-list.component.scss']
})
export class AmbassadorListComponent {

  @Input() ambassadors !: Ambassador[];
}
