import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { DynamicDialogConfig, DynamicDialogRef } from 'primeng/dynamicdialog';
import { MessageService } from 'primeng/api';

@Component({
  selector: 'app-add-edit-event-type',
  templateUrl: './add-edit-event-type.component.html',
  styleUrls: ['./add-edit-event-type.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class AddEditEventTypeComponent implements OnInit{

  eventTypeForm !: FormGroup;
  isSaveButtonClicked = false;
  isEditButtonClicked = false
  isEditMode = false;

  constructor(
    private fb : FormBuilder,
    private router: Router,
    private messageService : MessageService, 
    public config: DynamicDialogConfig,
    public ref: DynamicDialogRef,
  ){}

  ngOnInit(): void {
    this.initForm();
  }

  initForm(){
    this.eventTypeForm = this.fb.group({
      isActive : [false],
      name : ["", Validators.required]
    })
  }

  get formControls(){
    return this.eventTypeForm.controls;
  }

  onSaveEventType(){

  }

  onEditEventType(){

  }

  onCancelAddEditEventType(){
    this.ref.close();
  }

}
