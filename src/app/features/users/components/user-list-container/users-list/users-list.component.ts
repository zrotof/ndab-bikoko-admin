import { NgFor, NgIf } from '@angular/common';
import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Router } from '@angular/router';
import { MessageService, ConfirmationService, ConfirmEventType } from 'primeng/api';
import { ConfirmDialogModule } from 'primeng/confirmdialog';
import { OverlayModule } from 'primeng/overlay';
import { OverlayPanelModule } from 'primeng/overlaypanel';
import { TableModule } from 'primeng/table';
import { ToastModule } from 'primeng/toast';
import { User } from 'src/app/shared/models/user';
import { AuthService } from 'src/app/shared/services/auth/auth.service';
import { UsersService } from 'src/app/shared/services/users/users.service';

@Component({
  selector: 'app-users-list',
  standalone: true,
  imports : [
    NgIf,
    NgFor,
    TableModule,
    OverlayPanelModule,
    ToastModule,
    ConfirmDialogModule
  ],
  templateUrl: './users-list.component.html',
  styleUrls: ['./users-list.component.scss'],
  providers: [MessageService, ConfirmationService]
})
export class UsersListComponent{

  @Input() users !: User[];
  @Output() deleteUserEvent = new EventEmitter<string>();

  constructor(
    private messageService : MessageService, 
    private confirmationService: ConfirmationService,
    private router: Router,
    private userService: UsersService,
    private authService : AuthService
  ) { }
  
  //Prevent from deleting wbmaster from users 

  editUser(userId : any){
    this.userService.getUserById(userId)
      .subscribe(
        (result : any) => {
          this.router.navigate([`utilisateurs/modifier/${userId}`], { queryParamsHandling: 'preserve' })
        },
        (err) =>{
          this.messageService.add({severity:'error', detail: 'Erreur, contactez webmaster' });
        }
      )
  }

  deleteUser(user : User) {

    if(user.email === "sm-digitalizer@amadou-ba.sn"){
      this.messageService.add({severity:'error', detail: 'Vous ne pouvez pas supprimer cet utilisateur'});
      return ;
    }
    
    this.confirmationService.confirm({
      message: 'Voulez-vous vraiment supprimer ce compte?',
      accept: () => {
          this.deleteUserEvent.emit(user.id);
    },
        reject: (type: any) => {
            switch(type) {
                case ConfirmEventType.REJECT:
                    this.messageService.add({severity:'info', detail:'Suppression annulée'});
                break;
            }
        }
    })
  }

}
