import { AsyncPipe } from '@angular/common';
import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { Observable, map, pipe } from 'rxjs';
import { AgendaService } from 'src/app/shared/services/agenda/agenda.service';
import { MessageService } from 'primeng/api';
import { CategoryListMenuComponent } from 'src/app/shared/components/category-list-menu/category-list-menu.component';
import { Category } from 'src/app/shared/models/category';
import { AgendaListComponent } from './agenda-list/agenda-list.component';

@Component({
  selector: 'app-agenda-list-container',
  templateUrl: './agenda-list-container.component.html',
  styleUrls: ['./agenda-list-container.component.scss'],
  standalone: true,
  imports : [
    CategoryListMenuComponent,
    AgendaListComponent,
    RouterLink,
    AsyncPipe
  ],
  providers: [MessageService]
})

export class AgendaListContainerComponent {

  eventTypeList$ !: Observable<any>;
  eventsList$ !: Observable<any>;

  constructor(
    private agendaService : AgendaService,
    private messageService : MessageService
  ) { }

  ngOnInit(): void {
    this.getEventTypeList()
  }

  getEventTypeList(){
    this.eventTypeList$ = this.agendaService.getEventTypeList().pipe(
      map(result => result.map(
        (res: Category) => {
          return {
            id: res.id,
            name : res.name,
            isActive: false
          }
        })
      )
    )
  }

  getEventListByEventTypeId($event: number){
    const eventTypeId = $event;
    this.eventsList$ = this.agendaService.getEventList(eventTypeId);
  }

  deleteAgendaEventById($event : any){

    const eventId = $event.eventId;
    const evenTypeId = $event.categoryId

    this.agendaService.deleteEvent(eventId)
      .subscribe(
        (result : any) =>{
          if(result.status === "success" ){
            this.getEventListByEventTypeId(evenTypeId);
            //affichage du message lors d'un ajout sans erreur
            this.messageService.add({severity:'success', detail: result.message});
          }
          else{
            this.messageService.add({severity:'error', detail: result.message});
          }
        },
        (err) =>{
          this.messageService.add({severity:'error', detail: 'Erreur système: faire appel au webmaster'});
        }
      )
  }
}
