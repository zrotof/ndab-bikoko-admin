import { Pipe, PipeTransform } from '@angular/core';
import { IconProp } from '@fortawesome/fontawesome-svg-core';

import { 
  faUser, 
  faUsers, 
  faHeart, 
  faUserGroup, 
  faPassport, 
  faBed, 
  faPlaneDeparture, 
  faMugHot, 
  faUtensils,
  faBus,
  faVanShuttle,
  faShieldHalved,
  faPersonWalking
} from '@fortawesome/free-solid-svg-icons';

@Pipe({ name: 'convertStringLabelToFontawesomeIcon' })
export class ConvertStringLabelToFontawesomeIconPipe implements PipeTransform {

  transform(value: string): IconProp {
    switch (value) {
      case 'faBed':
        return faBed
      case 'faBus':
        return faBus
      case 'faHeart':
        return faHeart
      case 'faMugHot':
        return faMugHot
      case 'faPassport':
        return faPassport
      case 'faPersonWalking':
        return faPersonWalking
      case 'faPlaneDeparture':
        return faPlaneDeparture
      case 'faShieldHalved':
        return faShieldHalved
      case 'faUser':
        return faUser;
      case 'faUserGroup':
        return faUserGroup;
      case 'faUsers':
        return faUsers;
      case 'faUtensils':
        return faUtensils
      case 'faVanShuttle':
        return faVanShuttle
      default:
        return faUser;
    }
  }

}
