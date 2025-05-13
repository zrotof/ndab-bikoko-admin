import { Component, computed, inject } from '@angular/core';
import { Menu } from '../../models/side-bar';
import { MENU_LIST } from 'src/app/shared/constants/sidebar-menus.constants';
import { AuthService } from '../../services/auth/auth.service';

@Component({
  selector: 'app-side-bar-navigation',
  templateUrl: './side-bar-navigation.component.html',
  styleUrls: ['./side-bar-navigation.component.scss']
})

export class SideBarNavigationComponent {

  private authService = inject(AuthService);
  
  protected staffRoles = computed(() => this.authService.staffRoles());
  protected connectedStaffData = computed(() => this.authService.staffConnectedData());
  
  protected filterMenus = computed(() => this.getFilteredMenu())

  getFilteredMenu(): Menu[] {
    /*
    return MENU_LIST.map(menu => {
        const filteredMenuItems = menu.menuItems
          .filter(item =>
            item.allowedRoles.some(role => this.staffRoles().map((r: any) => r.code).includes(role))
          )
          .map(item => ({
            ...item,
            url: item.url === "/mes-groupes" ? `/staffs/${this.connectedStaffData().id}/mes-groupes` : item.url
          }));
        return { ...menu, menuItems: filteredMenuItems };
      })
      .filter(menu => menu.allowedRoles.some(role => this.staffRoles().map((r: any) => r.code).includes(role)));

      */

      return MENU_LIST
  }
  

  onDropdownMenuClicked(index: number) {
    this.filterMenus()[index].active = !this.filterMenus()[index].active;
  }
}
