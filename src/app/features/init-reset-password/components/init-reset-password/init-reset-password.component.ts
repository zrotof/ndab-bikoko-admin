import { Component, OnInit } from '@angular/core';
import { UntypedFormBuilder, UntypedFormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { AuthService } from 'src/app/shared/services/auth/auth.service';
import { UsersService } from 'src/app/shared/services/users/users.service';
import { NgClass, NgIf } from '@angular/common';
import { InputTextModule } from 'primeng/inputtext';


@Component({
    selector: 'app-init-reset-password',
    templateUrl: './init-reset-password.component.html',
    styleUrls: ['./init-reset-password.component.scss'],
    imports: [NgClass, NgIf, ReactiveFormsModule, InputTextModule]
})

export class InitResetPasswordComponent implements OnInit {

  initPassawordForm !: UntypedFormGroup;
  isSubmitFormButtonClicked = false;

  isRequestSucceed : boolean = false;
  isRequestFailed : boolean = false;
  message : string = '';

  isUserConnected : boolean = false;

  dataSubscription !: Subscription;

  constructor(
    private fb: UntypedFormBuilder, 
    private userService : UsersService,
    private authService : AuthService
    )
     { }

  ngOnInit(): void {
    this.authService.isLogged$.subscribe(res => {
      this.isUserConnected = res
    })

    this.initForm();
  }

  initForm() : void {
    this.initPassawordForm = this.fb.group({
      email : ["", [Validators.required, Validators.email] ]
    });
  }

  
  get f(){
    return this.initPassawordForm.controls;
  }

  onLaunchPassportInitialisation(){
    
    this.isSubmitFormButtonClicked = true;

    if(this.initPassawordForm.invalid){
      return; 
    }
    
    this.dataSubscription = this.userService.initResetPassport(this.initPassawordForm.value).subscribe({
      next : (res : any) => {

        this.isRequestFailed = false;
        this.isRequestSucceed = true;
        this.message = res.message;
      },
      error : err => {
        this.isRequestSucceed = false;
        this.isRequestFailed = true;
        this.message = err;
      }
    })
  }

  ngOnDestroy() {
    if (this.dataSubscription) {
      this.dataSubscription.unsubscribe();
    }
  }
}
