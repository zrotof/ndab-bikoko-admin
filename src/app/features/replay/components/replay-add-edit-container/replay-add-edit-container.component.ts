import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { NgIf } from '@angular/common';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { ReplayService } from 'src/app/shared/services/replay/replay.service';
import { lastValueFrom, timer } from 'rxjs';
import { Location } from '@angular/common';
import { MessageService } from 'primeng/api';
import { ActivatedRoute } from '@angular/router';
import { DropdownModule } from 'primeng/dropdown';
import { ToastModule } from 'primeng/toast';
import { InputTextModule } from 'primeng/inputtext';
import { InputSwitchModule } from 'primeng/inputswitch';

@Component({
  selector: 'app-replay-add-edit-container',
  standalone: true,
  imports: [
    NgIf,
    ReactiveFormsModule,
    DropdownModule,
    ToastModule,
    InputTextModule,
    InputSwitchModule
  ],
  templateUrl: './replay-add-edit-container.component.html',
  styleUrls: ['./replay-add-edit-container.component.scss'],
  encapsulation: ViewEncapsulation.None,
  providers: [MessageService]
})
export class ReplayAddEditContainerComponent implements OnInit {

  //Replay form declaration
  replayForm !: FormGroup;
  isSaveButtonClicked = false;
  isEditButtonClicked = false
  isEditMode = false;

  initialReplayDataWhenEdit: any;

  youtubePlaylists : any;

  pageId !: string ;

  constructor(
    private fb : FormBuilder,
    private replayService : ReplayService,
    private messageService : MessageService, 
    private location: Location,
    private activatedRoute : ActivatedRoute
  ){}

  ngOnInit(): void {
      this.initForm();
      this.getAllYoutubeChannelPlaylist();

  }

  initForm() : void {
    this.replayForm = this.fb.group({
      title : ["", Validators.required],
      playlistId : ["", Validators.required],
      isActive : [false]
    });
  }

  get formControls(){
    return this.replayForm.controls;
  }

  //This function is use to initialise form when editing a program
  checkEditMode(){
    this.activatedRoute.params.subscribe(
       (params : any)=>{
        if(params.id){
          this.isEditMode = true;

          this.replayService.getReplayById(params.id).subscribe(
            (result : any) => {
              if(result.status === "success"){
                //initialising first data when edit in order to know if value have any changes
                this.initialReplayDataWhenEdit = result.data;
                this.replayForm.controls['title'].setValue(this.initialReplayDataWhenEdit.title);
                this.replayForm.controls['isActive'].setValue(this.initialReplayDataWhenEdit.isActive);
                const index = this.youtubePlaylists.findIndex( (elem: { id: any; }) => elem.id == this.initialReplayDataWhenEdit.playlistId);
                this.replayForm.controls['playlistId'].setValue(this.youtubePlaylists[index]);
              }
            },
            () =>{
              this.messageService.add({
                severity:'warn', 
                detail: 'Replay inexistant, contactez le webmaster'
              });
              return;
            }
          )
        }
      },
      () =>{
        this.messageService.add({severity:'warn', detail: 'Replay inconnue' });
        return;
      }
    )
  }

  getAllYoutubeChannelPlaylist(){
    this.replayService.getListOfReplaysOnYoutube().subscribe( resp => {
      this.youtubePlaylists = resp.message;
      this.checkEditMode();
    });
  }

  onCancelAddEditReplay(){
    this.location.back();
  }

  onSaveReplay(){
    this.isSaveButtonClicked = true;

    if(this.replayForm.invalid){
      return; 
    }

    const newReplay = {
      title : this.replayForm.get('title')?.value,
      playlistId : this.replayForm.get('playlistId')?.value.id,
      isActive: this.replayForm.get('isActive')?.value
    }

    this.replayService.addReplay(newReplay)
      .subscribe(
        (result : any) => {
          //affichage du message lors d'un ajout sans erreur
          this.messageService.add({severity:'success', detail: result.message});
          lastValueFrom(timer(2000))
          .then(
            //après l'ajout d'une catégorie on revient à la liste
          () =>{this.location.back()});
        }
      )
  }

  onEditReplay(){
    this.isEditButtonClicked = true;

    if(
      this.replayForm.controls['title'].value === this.initialReplayDataWhenEdit.title
      &&
      this.replayForm.controls['playlistId'].value.id === this.initialReplayDataWhenEdit.playlistId
      &&
      this.replayForm.controls['isActive'].value === this.initialReplayDataWhenEdit.isActive
    ){
      this.messageService.add({severity:'info', detail: 'Aucune modification enregistrée'});
      return ;
    }

    let updatedReplay = {};

    if(this.replayForm.controls['title'].value !== this.initialReplayDataWhenEdit.title){
      updatedReplay = {...updatedReplay, title : this.replayForm.controls['title'].value}
    }

    if(this.replayForm.controls['playlistId'].value.id !== this.initialReplayDataWhenEdit.playlistId){
      updatedReplay = {...updatedReplay, playlistId : this.replayForm.controls['playlistId'].value.id}
    }

    if(this.replayForm.controls['isActive'].value !== this.initialReplayDataWhenEdit.isActive){
      updatedReplay = {...updatedReplay, isActive : this.replayForm.controls['isActive'].value}
    }

    this.replayService.editReplay(this.initialReplayDataWhenEdit.id , updatedReplay).subscribe(
      (result)=>{

        if(result.status === "success"){
         //affichage du message lors d'une édition sans erreur
         this.messageService.add({severity:'success', detail: result.message});
         lastValueFrom(timer(2000))
         .then(
           //après l'ajout d'une programme on revient à la liste
           () => { this.location.back() }
          );
        }
      },
      ()=>{
        this.messageService.add({severity:'info', detail: 'Programme inconnue'});
      }
    )
  }
}
