import { Component, OnDestroy, OnInit, ViewEncapsulation } from '@angular/core';
import { MessageService, ConfirmationService, ConfirmEventType } from 'primeng/api';
import { DialogService, DynamicDialogRef } from 'primeng/dynamicdialog';import { Replay } from 'src/app/shared/models/replay';
import { ReplayService } from 'src/app/shared/services/replay/replay.service';
import { Observable, Subscription } from 'rxjs';
import { Router, RouterLink } from '@angular/router';
import { AsyncPipe, NgIf } from '@angular/common';
import { ReplayListComponent } from './replay-list/replay-list.component';
import { ToastModule } from 'primeng/toast';
import { TableReorderUtils } from 'src/app/shared/utils/table-reorder.utils';
import { Reorder } from 'src/app/shared/models/reorder';
import { ConfirmDialogModule } from 'primeng/confirmdialog';

@Component({
  selector: 'app-replay-list-container',
  standalone: true,
  imports: [
    RouterLink,
    AsyncPipe,
    NgIf,
    ReplayListComponent,
    ToastModule,
    ConfirmDialogModule
  ],
  templateUrl: './replay-list-container.component.html',
  styleUrls: ['./replay-list-container.component.scss'],
  providers: [MessageService, ConfirmationService, DialogService],
  encapsulation: ViewEncapsulation.None,
})

export class ReplayListContainerComponent implements OnInit, OnDestroy  {

  replaysList$ !: Observable<Replay[]>;

  firstOrderedReplayList !: Replay[];
  currentOrderedReplayList !: Replay[];
  areThereNewOrderToSave = false;

  private subscriptions: Subscription[] = [];

  constructor(
    private replayService : ReplayService,
    private messageService : MessageService,
    private confirmationService: ConfirmationService,
    private reorderUtils : TableReorderUtils,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.getReplaysList()
  }

  getReplaysList(){
    this.replaysList$ = this.replayService.getReplaysList();
  }

  onReOrderDetect($event : Reorder){
    this.firstOrderedReplayList = $event.firstList as Replay[];
    this.currentOrderedReplayList = $event.currentList as Replay[];
    this.areThereNewOrderToSave = this.reorderUtils.areArraysEquals(this.firstOrderedReplayList, this.currentOrderedReplayList)
  }

  onEditReplayByIdDetect($event : number){
    const id = $event;

    this.subscriptions.push(
      this.replayService.getReplayById(id).subscribe({
        next : () => {
          this.router.navigate([`replays/modifier/${id}`], { queryParamsHandling: 'preserve' })
        },
        error : (err: any) => {
          this.messageService.add({severity:'error', detail: 'Erreur, contactez webmaster' });
        }
      })
    )
  }

  onDeleteReplayByIdDetect($event : number){

    this.confirmationService.confirm({
      message: "Voulez-vous vraiment supprimer ce type de Replay?",
      accept: () => {
        const id = $event;
        this.subscriptions.push(
          this.replayService.deleteReplay(id).subscribe({
            next : (result: any) => {
              this.getReplaysList();
              this.messageService.add({severity:'success', detail: result.message});
            },
            error : (err) => {
              this.messageService.add({severity:'error', detail: 'Erreur système: faire appel au webmaster'});
            }
          })
        )
      },
      reject: (type: any) => {
        switch(type) {
          case ConfirmEventType.REJECT:
             this.messageService.add({severity:'info', detail:'Suppression annulée'});
          break;
        }
      }
  })
  }

  setNewItemsOrder(){
    const newEventTypesOrder = this.reorderUtils.findDifferentIdsAndIndices(this.firstOrderedReplayList, this.currentOrderedReplayList);
    
    this.replayService.updateReplayListOrder(newEventTypesOrder).subscribe( {
      next : (res : any) => {
        this.messageService.add({severity:'success', detail: res});
      },
      error : (err : any) => {
        this.messageService.add({severity:'error', detail: err});
      },
      complete : () => { 
        this.areThereNewOrderToSave = false;
        this.getReplaysList();
      },
    })
  }

  ngOnDestroy(): void {
    this.subscriptions.forEach(sub => sub.unsubscribe());
  }

}
