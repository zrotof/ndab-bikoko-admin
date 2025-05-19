import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { UntypedFormGroup, UntypedFormBuilder, Validators, ReactiveFormsModule } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { MessageService } from 'primeng/api';
import { lastValueFrom, timer } from 'rxjs';
import { Location, NgIf } from '@angular/common';
import { User } from 'src/app/shared/models/user';
import { UsersService } from 'src/app/shared/services/users/users.service';
import { Roles } from '../../../../shared/models/roles';
import { InputTextModule } from 'primeng/inputtext';
import { MultiSelectModule } from 'primeng/multiselect';
import { ToastModule } from 'primeng/toast';

@Component({
    selector: 'app-users-add-edit',
    templateUrl: './users-add-edit.component.html',
    styleUrls: ['./users-add-edit.component.scss'],
    encapsulation: ViewEncapsulation.None,
    providers: [MessageService],
    imports: [NgIf, ReactiveFormsModule, InputTextModule, MultiSelectModule, ToastModule]
})

export class UsersAddEditComponent implements OnInit {

  roles = Object.keys(Roles).filter(key => isNaN(+key));;

  //Program form declaration
  userForm : UntypedFormGroup;
  isSaveButtonClicked = false;
  isEditButtonClicked = false;
  isEditMode = false;
  initialUserDataBeforeEdit !: User;

  imageDisplay!: string | ArrayBuffer | null;
  isImageEdit = false;

  currentDate: any;

  positionsList: any[]= [];
  employeesList: any[] = [];

  constructor(
    private fb: UntypedFormBuilder,
    private messageService : MessageService, 
    private router : Router,
    private activatedRoute: ActivatedRoute,
    private location : Location,
    private userService : UsersService
  ){

  this.userForm = this.fb.group({
    firstname: ["", Validators.required],
    lastname: ["", Validators.required],
    email: ["", [Validators.required, Validators.pattern("^[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$")]],
    password: ["", Validators.required],
    roles: [[], Validators.required]
    });
  }

  ngOnInit(): void {
    this.checkEditMode();
  }

  get formControls(){
    return this.userForm.controls;
  }

  //This function is use to initialise form when editing a program
  checkEditMode(){

    this.activatedRoute.params.subscribe(
      (params : any)=>{
        if(params.id){

        this.isEditMode = true;

        if(this.isEditMode){
          this.userForm.controls['password'].removeValidators(Validators.required)
        }

        this.userService.getUserById(params.id).subscribe(
          (result : any) => {

            if(result.status === 'success'){
              this.initialUserDataBeforeEdit = result.data;

              this.userForm.controls['firstname'].setValue(this.initialUserDataBeforeEdit.firstname);
              this.userForm.controls['lastname'].setValue(this.initialUserDataBeforeEdit.lastname);              
              this.userForm.controls['email'].setValue(this.initialUserDataBeforeEdit.email);
              this.userForm.controls['roles'].setValue(this.initialUserDataBeforeEdit.roles);
            }
          },
          () =>{
            this.messageService.add({severity:'warn', detail: 'Émission inexistante, contactez le webmaster'});
            return;
          }
        )}
      },
      () =>{
        this.messageService.add({severity:'warn', detail: 'Destination populaire inconnue' });
        return;
      }
)}

  onSaveUser(){

    this.isSaveButtonClicked = true;

    if(this.userForm.invalid){
      return; 
    }

    const userToSave = {
      firstname : this.userForm.controls['firstname'].value,
      lastname : this.userForm.controls['lastname'].value,
      email : this.userForm.controls['email'].value,
      password: this.userForm.controls['password'].value,
      roles: this.userForm.controls['roles'].value.join("|")
    };

    this.userService.addUser(userToSave)
    .subscribe(
      (result) =>{
        this.messageService.add({severity:'success', detail: result.message});
          lastValueFrom(timer(2000))
          .then(
            //après l'ajout d'une catégorie on revient à la liste
          () =>{ this.location.back()});
      },
      (err) => {
        this.messageService.add({severity:'info', detail: err.error.message});
      }
    )
  }

  onCancelAddEditUser(){
    this.router.navigateByUrl('/utilisateurs');
  }

  onEdituser(){

    this.isEditButtonClicked = true;

    if(this.userForm.controls['roles'].value.length <1){
      return ;
    }

    if(
      (
        this.userForm.controls['firstname'].value == this.initialUserDataBeforeEdit.firstname
        &&
        this.userForm.controls['lastname'].value == this.initialUserDataBeforeEdit.lastname 
        &&
        this.userForm.controls['email'].value == this.initialUserDataBeforeEdit.email
        &&
        this.checkIfTwoArraysAreEquals(this.userForm.controls['roles'].value, this.initialUserDataBeforeEdit.roles)
      )
    ){

      this.messageService.add({severity:'info', detail: 'Aucune modification enregistrée'});
      return ;
      }
    
     let userDataToUpdate = {};

    if(this.userForm.controls['firstname'].value  !==  this.initialUserDataBeforeEdit.firstname){
      userDataToUpdate = {...userDataToUpdate, firstname:  this.userForm.controls['firstname'].value };
    }

    if(this.userForm.controls['lastname'].value !==  this.initialUserDataBeforeEdit.lastname){
      userDataToUpdate = {...userDataToUpdate, lastname : this.userForm.controls['lastname'].value};
    }

    if(this.userForm.controls['email'].value  !==  this.initialUserDataBeforeEdit.email){
      userDataToUpdate = {...userDataToUpdate, email : this.userForm.controls['email'].value};
    }

    if(!this.checkIfTwoArraysAreEquals(this.userForm.controls['roles'].value, this.initialUserDataBeforeEdit.roles)){
      userDataToUpdate = {...userDataToUpdate, roles : this.userForm.controls['roles'].value.join("|")};
    }

    this.userService.editUser(this.initialUserDataBeforeEdit.id, userDataToUpdate).subscribe(
      (result)=>{

        if(result.status){
         //affichage du message lors d'un ajout sans erreur
         this.messageService.add({severity:'success', detail: result.message});
         lastValueFrom(timer(2000))
         .then( 
            () =>{
              this.location.back()
            }
          );
        }
      },
      ()=>{
        this.messageService.add({severity:'info', detail: 'Éditeur inconnu'});
      }
    )
  }

  checkIfTwoArraysAreEquals(arr1: [], arr2:[]) : boolean{
   return arr1.sort().toString() == arr2.sort().toString() ;
  }

}


