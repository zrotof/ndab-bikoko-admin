import { Component, Input, OnInit } from '@angular/core';
import {  faCirclePlay, faUsers, faNewspaper, faAngleDown, faUserTie, faCalendarAlt, faChartLine, faVideoCamera,  } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-side-bar-navigation',
  templateUrl: './side-bar-navigation.component.html',
  styleUrls: ['./side-bar-navigation.component.scss']
})
export class SideBarNavigationComponent implements OnInit {

  @Input() screenWidth !: number;
  
  faUsers = faUsers;
  faCalendarAlt = faCalendarAlt;
  faChartLine = faChartLine;
  faAngleDown = faAngleDown;
  faNewspaper = faNewspaper;
  faCamera = faVideoCamera;
  faUserTie = faUserTie;
  faCirclePlay = faCirclePlay;

  menuList !: any[];

  constructor() {
  }

  ngOnInit(): void {
    this.initMenus();
  }

  initMenus(){
    this.menuList = [
      {
        icon: this.faChartLine,
        label: "Tableau De Bord",
        active: true,
        menuItems : [
          { label: "Général", link:"" },
        ]
      },
      {
        icon: this.faUsers,
        label: "Ambassadeurs",
        active: false,
        menuItems : [
          {label: "Liste ambassadeurs", link:"/ambassadeur-de-campagne"},
         
        ]
      },
      {
        icon: this.faCalendarAlt,
        label: "Agenda",
        active: false,
        menuItems : [
          {label: "Types d'évênements", link:"agenda/liste-types-d-evenements"},
          {label: "Évênements", link:"/agenda/liste-par-type-d-evenement"}
        ]
      },
      {
        icon: this.faNewspaper,
        label: "Articles",
        active: false,
        menuItems : [
          {label: "liste d'articles", link:"/articles/liste-par-type-de-rubrique"},
          {label: "Rubriques d'articles", link:"/articles/liste-rubriques"}
        ]
      },
      {
        icon: this.faCirclePlay,
        label: "Replays",
        active: false,
        menuItems : [
          {label: "Liste replays", link:"/replays"},
          {label: "Ajouter replays", link:"/replays/creer"}
        ]
      },
      {
        icon: this.faUserTie,
        label: "Utilisateurs",
        active: false,
        menuItems : [
          {label: "Liste utilisateurs", link:"/utilisateurs"},
          {label: "Ajouter utilisateur", link:"/utilisateurs/creer"}
        ]
      },
    ]
  }

  onItemMenuClicked( index: number){

    this.menuList[index].active = !this.menuList[index].active;

  }

}
