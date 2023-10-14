import { Component, OnInit } from '@angular/core';
import { AsyncPipe, CommonModule } from '@angular/common';
import { User } from 'src/app/shared/models/user';
import { Observable } from 'rxjs';
import { UsersService } from 'src/app/shared/services/users/users.service';
import { AuthService } from 'src/app/shared/services/auth/auth.service';
import { ConfirmationService, MessageService } from 'primeng/api';
import { Router, RouterLink } from '@angular/router';
import { UsersListComponent } from './users-list/users-list.component';

@Component({
  selector: 'app-user-list-container',
  standalone: true,
  imports: [
    AsyncPipe,
    RouterLink,
    UsersListComponent
  ],
  templateUrl: './user-list-container.component.html',
  styleUrls: ['./user-list-container.component.scss'],
  providers: [MessageService, ConfirmationService]
})
export class UserListContainerComponent implements OnInit {

  usersList$ !: Observable<User[]>;
  
  constructor(
    private userService : UsersService,
    private messageService : MessageService, 
    private confirmationService: ConfirmationService,
    private router: Router,
    private authService :AuthService
  ) { }

  ngOnInit(): void {
    this.getusers();
  }

  getusers(){  
    this.usersList$ = this.userService.getUsersList();
  }

  deleteUserById($event : string){
    const userId = $event;
    this.userService.deleteUser(userId)
    .subscribe(
      (result: any) => {
        this.getusers();
        //affichage du message lors d'un ajout sans erreur
        this.messageService.add({severity:'success', detail: result.message});
      },
      (error : any) => {
        this.messageService.add({severity:'error', detail: 'Erreur système: faire appel au webmaster'});
      }
    )
  }
}
