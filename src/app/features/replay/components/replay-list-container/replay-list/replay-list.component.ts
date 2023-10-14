import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Router } from '@angular/router';
import { ReplayService } from 'src/app/shared/services/replay/replay.service';
import { ConfirmationService, ConfirmEventType, MessageService } from 'primeng/api';
import { Replay } from 'src/app/shared/models/replay';
import { NgClass, NgIf } from '@angular/common';
import { TableModule } from 'primeng/table';
import { OverlayModule } from 'primeng/overlay';
import { ConfirmDialogModule } from 'primeng/confirmdialog';
import { ToastModule } from 'primeng/toast';
import { OverlayPanelModule } from 'primeng/overlaypanel';

@Component({
  selector: 'app-replay-list',
  standalone: true,
  imports : [
    NgIf,
    TableModule,
    OverlayModule,
    ConfirmDialogModule,
    ToastModule,
    OverlayPanelModule,
    NgClass
  ],
  templateUrl: './replay-list.component.html',
  styleUrls: ['./replay-list.component.scss'],
  providers: [MessageService, ConfirmationService]
})
export class ReplayListComponent {

  @Input() replays !: Replay[];
  @Output() deleteReplayEvent = new EventEmitter<string>();

  constructor( 
    private router: Router,
    private replayService : ReplayService,
    private messageService : MessageService, 
    private confirmationService: ConfirmationService
  ) { }


  editReplay(replayId : any){
    this.replayService.getReplayById(replayId)
      .subscribe(
        (result : any) => {

          if(result.status=== "success"){
            this.router.navigate([`replays/modifier/${replayId}`], { queryParamsHandling: 'preserve' })
          }

          else{
            this.messageService.add({severity:'warn', detail: result.message });
          }

        },
        (err) =>{
          this.messageService.add({severity:'error', detail: 'Erreur, contactez webmaster' });
        }
      )
  }

  deleteReplay(replayId: string){
    this.confirmationService.confirm({
      message: 'Voulez-vous vraiment supprimer cette replay?',
      accept: () => {
          //Emit event to do the delation
          this.deleteReplayEvent.emit(replayId);
    },
        reject: (type: any) => {
            switch(type) {
                case ConfirmEventType.REJECT:
                    this.messageService.add({severity:'info', detail:'Suppression annulée'});
                break;
            }
        }
  }
)
  }

}
