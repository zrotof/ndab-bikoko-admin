import { Component, OnDestroy, OnInit, ViewEncapsulation } from '@angular/core';
import { NgIf } from '@angular/common';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { UsersService } from 'src/app/shared/services/users/users.service';
import { Subscription } from 'rxjs';
import { User } from 'src/app/shared/models/user';
import * as JWT from 'jwt-decode';
import { ToastModule } from 'primeng/toast';
import { MessageService } from 'primeng/api';
import { AuthService } from 'src/app/shared/services/auth/auth.service';

@Component({
  selector: 'app-validate-account-container',
  standalone: true,
  imports: [
    NgIf,
    RouterLink,
    ToastModule
  ],
  templateUrl: './validate-account-container.component.html',
  styleUrls: ['./validate-account-container.component.scss'],
  encapsulation: ViewEncapsulation.None,
  providers: [MessageService]
})
export class ValidateAccountContainerComponent implements OnInit, OnDestroy {

  emailVerifyToken !: string;
  associatedUser !: User;
  isTokenVaild !: boolean;
  message !: string;
  isThereAssociatedUserToToken !: boolean;
  askVerificationEmailResultMessage !: string;

  dataSubscription !: Subscription;

  constructor( 
    private activatedRoute : ActivatedRoute,
    private userService : UsersService,
    private messageService : MessageService,    
    private router: Router,
    private authService : AuthService
  ){}
  
  ngOnInit(): void{
    this.redirectOnAlreadyLog();
    this.getTokenFromUrl();
    this.getAssociatedUser(this.emailVerifyToken);
    this.verifyToken();
  }

  redirectOnAlreadyLog() : void{
    this.authService.isLogged$.subscribe(res => {
      if(res === true){
        this.router.navigateByUrl("");
      }
    })
  }

  getTokenFromUrl() : void{
    this.activatedRoute.queryParams.subscribe(
      result => {
        this.emailVerifyToken = result.token;
        localStorage.setItem('tokenToVerifyEmail', this.emailVerifyToken)
      }
    )
  }

  verifyToken(): void{
    this.dataSubscription = this.userService.verifyEmail().subscribe({
      next : (res : any) => {
        this.isTokenVaild= true;
        this.message = res.message
      },
      error : (err : any) => {
        this.isTokenVaild= false;
        this.message = err.message
      }
    }
    );
  }

  getAssociatedUser(token : string){
    const payload : {exp: number, iat: number, sub: string } = JWT.default(token);  
    const userId = payload.sub ;

    this.userService.getUserById(userId).subscribe(
      {
        next : res => {
          this.isThereAssociatedUserToToken = true;
          this.associatedUser = res.data;
        },
        error : err => {
          this.isThereAssociatedUserToToken = false;
        }
      }
    )
  }

  onAskForMailValidation(userId : string): void {
    this.dataSubscription = this.userService.askNewVerifyEmail(userId).subscribe(
      {
        next : res => { 
          this.messageService.add({severity:'success', detail: res.message})
        }
      }
    );
  }

  ngOnDestroy() {
    if (this.dataSubscription) {
      this.dataSubscription.unsubscribe();
    }
  }
}
