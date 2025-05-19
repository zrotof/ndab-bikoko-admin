import { AfterViewInit, Component, ElementRef, OnInit, ViewChild, ViewEncapsulation } from '@angular/core';
import { UserConnectedMenuSideBarComponent } from '../user-connected-menu-side-bar/user-connected-menu-side-bar.component';
import { ToastModule } from 'primeng/toast';
import { MessageService } from 'primeng/api';
import { MenuItem } from 'primeng/api';
import { Menu } from 'primeng/menu';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
  providers: [MessageService],
  encapsulation: ViewEncapsulation.None,
  imports: [
    Menu,
    UserConnectedMenuSideBarComponent,
    ToastModule
  ]
})
export class HeaderComponent implements AfterViewInit {

  @ViewChild('menu') menu!: Menu;
@ViewChild('connectedUser') connectedUserElement !: ElementRef;
  items = [
    {
      items: [
        {
          label: 'Mon Profil',
          icon: 'pi pi-user'
        },
        {
          label: 'Sécurité du compte',
          icon: 'pi pi-shield'
        },
        {
          label: 'Déconnexion',
          icon: 'pi pi-sign-out'
        }
      ]
    }
  ];

  ngAfterViewInit() {
   // this.menu.appendTo = this.connectedUserRef.nativeElement;
  }

  openMenu(event: MouseEvent) {
    this.menu.toggle(event);
  }

}
