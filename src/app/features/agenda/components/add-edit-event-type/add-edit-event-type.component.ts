import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { MessageService } from 'primeng/api';
import { Location, NgFor, NgIf } from '@angular/common';
import { InputSwitchModule } from 'primeng/inputswitch';
import { InputTextModule } from 'primeng/inputtext';
import { TableModule } from 'primeng/table';
import { ToastModule } from 'primeng/toast';
import { AgendaService } from 'src/app/core/services/planner/planner.service';
import { lastValueFrom, timer } from 'rxjs';

@Component({
    selector: 'app-add-edit-event-type',
    templateUrl: './add-edit-event-type.component.html',
    styleUrls: ['./add-edit-event-type.component.scss'],
    encapsulation: ViewEncapsulation.None,
    providers: [MessageService],
    imports: [
        NgIf,
        NgFor,
        TableModule,
        ToastModule,
        ReactiveFormsModule,
        InputTextModule,
        InputSwitchModule
    ]
})
export class AddEditEventTypeComponent implements OnInit{

  eventTypeForm !: FormGroup;
  isSaveButtonClicked = false;
  isEditButtonClicked = false
  isEditMode = false;

  initialEventTypeDataWhenEdit: any;


  constructor(
    private fb : FormBuilder,
    private messageService : MessageService,
    private location: Location,
    private activatedRoute : ActivatedRoute,
    private agendaService : AgendaService
  ){}

  ngOnInit(): void {
    this.initForm();
    this.checkEditMode();
  }

  initForm(){
    this.eventTypeForm = this.fb.group({
      isActive : [false],
      name : ["", Validators.required],
      description : ["", Validators.required]
    })
  }

  get formControls(){
    return this.eventTypeForm.controls;
  }


  checkEditMode(){
    this.activatedRoute.params.subscribe(
       (params : any)=>{
        if(params.id){
          this.isEditMode = true;

          this.agendaService.getEventTypeById(params.id).subscribe(
            (result : any) => {
              if(result.status === "success"){
                //initialising first data when edit in order to know if value have any changes
                this.initialEventTypeDataWhenEdit = result.data;
                this.eventTypeForm.controls['name'].setValue(this.initialEventTypeDataWhenEdit.name);
                this.eventTypeForm.controls['description'].setValue(this.initialEventTypeDataWhenEdit.description);
                this.eventTypeForm.controls['isActive'].setValue(this.initialEventTypeDataWhenEdit.isActive);
              }
            },
            () =>{
              this.messageService.add({
                severity:'warn', 
                detail: "Type d'évênement inexistant, contactez le webmaster"
              });
              return;
            }
          )
        }
      },
      () =>{
        this.messageService.add({severity:'warn', detail: "Type d'évênement inconnue" });
        return;
      }
    )
  }

  onSaveEventType(){
    this.isSaveButtonClicked = true;

    if(this.eventTypeForm.invalid){
      return; 
    }

    this.agendaService.addEventType(this.eventTypeForm.value)
      .subscribe(
        (result : any) => {
          //affichage du message lors d'un ajout sans erreur
          this.messageService.add({severity:'success', detail: result.message});
          lastValueFrom(timer(2000))
          .then(
            //après l'ajout d'une catégorie on revient à la liste
          () =>{this.location.back()});
        },
        ()=>{
          this.messageService.add({severity:'info', detail: "Erreur lors de l'ajout, re-essayez plus tard"});
        }
      )
  }

  onEditEventType(){
    this.isEditButtonClicked = true;

    if(
      this.eventTypeForm.controls['name'].value === this.initialEventTypeDataWhenEdit.name
      &&
      this.eventTypeForm.controls['description'].value === this.initialEventTypeDataWhenEdit.description
      &&
      this.eventTypeForm.controls['isActive'].value === this.initialEventTypeDataWhenEdit.isActive
    ){
      this.messageService.add({severity:'info', detail: 'Aucune modification enregistrée'});
      return ;
    }

    let updatedRubric = {};

    if(this.eventTypeForm.controls['name'].value !== this.initialEventTypeDataWhenEdit.name){
      updatedRubric = {...updatedRubric, name : this.eventTypeForm.controls['name'].value}
    }

    if(this.eventTypeForm.controls['description'].value !== this.initialEventTypeDataWhenEdit.description){
      updatedRubric = {...updatedRubric, description : this.eventTypeForm.controls['description'].value}
    }

    if(this.eventTypeForm.controls['isActive'].value !== this.initialEventTypeDataWhenEdit.isActive){
      updatedRubric = {...updatedRubric, isActive : this.eventTypeForm.controls['isActive'].value}
    }


    this.agendaService.editEventTypeById(this.initialEventTypeDataWhenEdit.id as string, updatedRubric).subscribe(
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
        this.messageService.add({severity:'info', detail: "Modification échouée, contactez le webmaster"});
      }
    )
  }

  onCancelAddEditEventType(){
    this.location.back();
  }

}
