import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { MessageService, ConfirmationService, ConfirmEventType } from 'primeng/api';

@Component({
  selector: 'app-agenda-list-container',
  templateUrl: './agenda-list-container.component.html',
  styleUrls: ['./agenda-list-container.component.scss'],
  providers: [MessageService, ConfirmationService]
})

export class AgendaListContainerComponent {

  constructor(
    private messageService : MessageService, 
    private confirmationService: ConfirmationService,
    private router: Router
  ) { }

  onAddEvent(){
    this.router.navigate(['/agenda/creer'])
  }
}
