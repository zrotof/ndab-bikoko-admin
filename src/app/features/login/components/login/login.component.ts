import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { ReactiveFormsModule, UntypedFormBuilder, UntypedFormGroup, Validators } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { MessageService } from 'primeng/api';
import { JsonPipe, Location, NgIf } from '@angular/common';
import { AuthService } from 'src/app/shared/services/auth/auth.service';
import { ProgressSpinnerModule } from 'primeng/progressspinner';
import * as JWT from 'jwt-decode';
import { UsersService } from 'src/app/shared/services/users/users.service';
import { InputTextModule } from 'primeng/inputtext';
import { PasswordModule } from 'primeng/password';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
  standalone : true,
  imports : [
    NgIf,
    InputTextModule,
    PasswordModule,
    ProgressSpinnerModule,
    LoginComponent,
    JsonPipe,
    ReactiveFormsModule,
    RouterLink
  ],
  encapsulation: ViewEncapsulation.None,
  providers: [MessageService]
})
export class LoginComponent implements OnInit {

  loginForm !: UntypedFormGroup;
  isSaveButtonClicked = false;
  isMessageErrorDisplayed : boolean = false;
  messageError !: string;
  
  isLoginFormSubmittedAndNotErrorOnClientSide = false; 

  constructor(
    private fb: UntypedFormBuilder,
    private authService : AuthService,
    private userService : UsersService,
    private router: Router,     
  ){}

  ngOnInit(): void {
    this.redirectOnAlreadyLog();
    this.initForm();
  }

  redirectOnAlreadyLog() : void{
    this.authService.isLogged$.subscribe(res => {
      if(res === true){
        this.router.navigateByUrl("");
      }
    })
  }

  initForm() : void {
    this.loginForm = this.fb.group({
      email : ["", Validators.required],
      password : ["", Validators.required]
    });
  }

  get f(){
    return this.loginForm.controls;
  }

  onLogin(){
    this.isMessageErrorDisplayed = false;

    this.isSaveButtonClicked = true;

    if(this.loginForm.invalid){
      return; 
    }

    this.isLoginFormSubmittedAndNotErrorOnClientSide = true;

    this.authService.login(this.loginForm.value).subscribe(
      {
        next : (res) => {
          this.handleSuccessfullyLogged(res)
          this.isLoginFormSubmittedAndNotErrorOnClientSide = false
          this.router.navigateByUrl("");
        },
        error : err => {
          this.isMessageErrorDisplayed = true;
          this.messageError = err;
          this.isLoginFormSubmittedAndNotErrorOnClientSide = false
        }
      }
    )
  }

  handleSuccessfullyLogged(token : string){
    const payload : {exp: number, iat: number, sub: string } = JWT.default(token);
    const connectedUserId = payload.sub;
    const timeout = payload.exp - payload.iat ;

    if(timeout > 0) {
      this.authService.isLogged$.next(true);
      this.setConnectedUser(connectedUserId);
    }    
  }

  setConnectedUser(userId : string){
    this.userService.getUserById(userId).subscribe(
      res => {
        this.authService.user$.next(res.data);
      }
    )
  }

}
