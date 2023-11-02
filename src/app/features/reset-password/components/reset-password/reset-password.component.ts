import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { UntypedFormBuilder, UntypedFormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthService } from 'src/app/shared/services/auth/auth.service';
import { MessageService } from 'primeng/api';
import { UsersService } from 'src/app/shared/services/users/users.service';
import { lastValueFrom, timer } from 'rxjs';


@Component({
  selector: 'app-reset-password',
  templateUrl: './reset-password.component.html',
  styleUrls: ['./reset-password.component.scss'],
  encapsulation: ViewEncapsulation.None,
  providers: [MessageService]
})
export class ResetPasswordComponent implements OnInit {

  changePasswordToken !: string;

  resetPasswordForm : UntypedFormGroup;
  isSaveButtonClicked = false;
  youtubePlaylists : any;
  isMessageErrorDisplayed : boolean = false;
  
  message !: string;
  
  isUserConnected : boolean = false;

  isRequestFailed : boolean = false;

  isRequestSucceed : boolean = false;

  constructor(
    private fb: UntypedFormBuilder, 
    private router: Router,     
    private authService : AuthService, 
    private userService : UsersService,
    private activatedRoute : ActivatedRoute
  ) {

    this.resetPasswordForm = this.fb.group({
      password : ["", [Validators.required] ],
      confirmPassword : ["", [Validators.required] ]
    });
   }

  ngOnInit(): void {
    this.authService.isLogged$.subscribe(res => {
      this.isUserConnected = res
    })

    this.getTokenFromUrl();
  }

  get f(){
    return this.resetPasswordForm.controls;
  }

  getTokenFromUrl() : void{
    this.activatedRoute.queryParams.subscribe(
      result => {
        this.changePasswordToken = result.token;
        localStorage.setItem('changePasswordToken', this.changePasswordToken)
      }
    )
  }

  onResetPassword(){
    this.isSaveButtonClicked = true;

    if(this.resetPasswordForm.invalid){
      return; 
    }

    if(this.f['password'].value.localeCompare(this.f['confirmPassword'].value) !== 0){
      this.isRequestSucceed = false;
      this.isRequestFailed = true;
      this.message = "Les mots de passe ne sont pas identiques";
      return; 
    }

    const newPassword = this.f['password'].value

    this.userService.resetPassport( newPassword ).subscribe(
      {
        next : (res) => {
          this.isRequestFailed = false;
          this.isRequestSucceed = true;
          this.message = res.message
          lastValueFrom(timer(4000))
          .then(
            ()=>{
              this.authService.logout();
              this.router.navigateByUrl('se-connecter')
            }
          )
        },
        error : err => {
          this.isRequestSucceed = false;
          this.isRequestFailed = true;
          this.message = err;
        }
      }
    )
  }

}
