import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { ReactiveFormsModule, UntypedFormBuilder, UntypedFormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { MessageService } from 'primeng/api';
import { JsonPipe, Location, NgIf } from '@angular/common';
import { AuthService } from 'src/app/shared/services/auth/auth.service';
import { ProgressSpinnerModule } from 'primeng/progressspinner';
import * as JWT from 'jwt-decode';
import { UsersService } from 'src/app/shared/services/users/users.service';
import { InputTextModule } from 'primeng/inputtext';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
  standalone : true,
  imports : [
    NgIf,
    InputTextModule,
    ProgressSpinnerModule,
    LoginComponent,
    JsonPipe,
    ReactiveFormsModule
  ],
  encapsulation: ViewEncapsulation.None,
  providers: [MessageService]
})
export class LoginComponent implements OnInit {

  loginForm : UntypedFormGroup;
  isSaveButtonClicked = false;
  isMessageErrorDisplayed : boolean = false;
  messageError !: string;
  
  isLoginFormSubmittedAndNotErrorOnClientSide = false; 

  constructor(
    private fb: UntypedFormBuilder, 
    private router: Router,     
    private location: Location,
    private authService : AuthService,
    private userService : UsersService
  ) {

    this.authService.isLogged$.subscribe(res => {
      if(res === true){
        this.router.navigateByUrl("");
      }
    })

    this.loginForm = this.fb.group({
      email : ["", Validators.required],
      password : ["", Validators.required]
    });
   }

  ngOnInit(): void {
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
    const payload : {exp: Number, iat: Number, sub: any } = JWT.default(token);
    const connectedUserId = payload.sub as string;
    const connectedExpirationTime = payload.exp as number;

    this.setConnectedUser(connectedUserId);
    this.authService.isLogged$.next(true);
  }

  setConnectedUser(userId : string){
    this.userService.getUserById(userId).subscribe(
      res => {
        this.authService.user$.next(res.data);
      }
    )
  }

}
