import { Component, OnInit } from '@angular/core';
import { MessageService } from 'primeng/api';
import { Replay } from 'src/app/shared/models/replay';
import { ReplayService } from 'src/app/shared/services/replay/replay.service';
import { Observable } from 'rxjs';
import { RouterLink } from '@angular/router';
import { AsyncPipe } from '@angular/common';
import { ReplayListComponent } from './replay-list/replay-list.component';

@Component({
  selector: 'app-replay-list-container',
  standalone: true,
  imports: [
    RouterLink,
    AsyncPipe,
    ReplayListComponent
  ],
  templateUrl: './replay-list-container.component.html',
  styleUrls: ['./replay-list-container.component.scss'],
  providers: [MessageService]
})
export class ReplayListContainerComponent implements OnInit  {

  replaysList$ !: Observable<Replay[]>;

  constructor(
    private replayService : ReplayService,
    private messageService : MessageService, 
    ) { }

  ngOnInit(): void {
    this.getReplaysList()
  }

  getReplaysList(){
    this.replaysList$ = this.replayService.getReplaysList();
  }

  deleteReplayById($event : string){

    const replayId = $event;

    this.replayService.deleteReplay(replayId)
      .subscribe(
        (result : any) =>{
          console.log(result)
          if(result.status === "success" ){
            this.getReplaysList();
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
