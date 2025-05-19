import { Pipe, PipeTransform } from '@angular/core';
import { IconProp } from '@fortawesome/fontawesome-svg-core';

import {
  faAngleDown,
  faAngleUp,
  faArrowLeft,
  faArrowRight,
  faArrowUp19,
  faBan,
  faBed,
  faBell,
  faBriefcase,
  faBullhorn,
  faBus,
  faCalendarAlt,
  faCar,
  faCartPlus,
  faChartLine,
  faChurch,
  faCircleCheck,
  faCircleDollarToSlot,
  faCross,
  faCode,
  faEarthAfrica,
  faEnvelope,
  faEuroSign,
  faEye,
  faFilter,
  faFloppyDisk,
  faGlobe,
  faHeart,
  faHandHoldingMedical,
  faHouseUser,
  faIdBadge,
  faLaptop,
  faLocationDot,
  faLock,
  faMapMarkedAlt,
  faNewspaper,
  faPen,
  faPeopleGroup,
  faPeopleRoof,
  faPhoneVolume,
  faPlay,
  faPencil,
  faPlus,
  faTrashCan,
  faThumbsUp,
  faThumbsDown,
  faUser,
  faUserGroup,
  faUserPlus,
  faUsers,
  faUserTie,
  faVideo,
  faXmark
} from '@fortawesome/free-solid-svg-icons';

import {
  faClock,
} from '@fortawesome/free-regular-svg-icons';

@Pipe({
  name: 'convertStringLabelToFontawesomeIcon'
})

export class ConvertStringLabelToFontawesomeIconPipe implements PipeTransform {

  transform(value: string): IconProp {
    switch (value) {
      case 'faAngleDown':
        return faAngleDown
      case 'faAngleUp':
        return faAngleUp
      case 'faArrowLeft':
        return faArrowLeft
      case 'faArrowRight':
        return faArrowRight
      case 'faArrowUp19':
        return faArrowUp19
      case 'faBan':
        return faBan
      case 'faBell':
        return faBell
      case 'faBed':
        return faBed
      case 'faBriefcase':
        return faBriefcase
      case 'faBullhorn':
        return faBullhorn
      case 'faBus':
        return faBus
      case 'faCalendarAlt':
        return faCalendarAlt
      case 'faCar':
        return faCar
      case 'faCartPlus':
        return faCartPlus
      case 'faClock':
        return faClock
      case 'faChurch':
        return faChurch
      case 'faCircleCheck':
        return faCircleCheck
      case 'faCircleDollarToSlot':
        return faCircleDollarToSlot
      case 'faCode':
        return faCode  
      case 'faCross':
        return faCross
      case 'faEarthAfrica':
        return faEarthAfrica
      case 'faEnvelope':
        return faEnvelope
      case "faEuroSign":
        return faEuroSign
      case 'faEye':
        return faEye
      case 'faHeart':
        return faHeart
      case 'faHandHoldingMedical':
        return faHandHoldingMedical
      case 'faHouseUser':
        return faHouseUser
      case 'faChartLine':
        return faChartLine
      case 'faFilter':
        return faFilter
      case 'faFloppyDisk':
        return faFloppyDisk
      case 'faLaptop':
        return faLaptop
      case 'faLocationDot':
        return faLocationDot
      case 'faLock':
        return faLock
      case 'faGlobe':
        return faGlobe
      case 'faIdBadge': 
        return faIdBadge
      case 'faMapMarkedAlt':
        return faMapMarkedAlt
      case 'faNewspaper':
        return faNewspaper
      case 'faPlay':
        return faPlay
      case 'faPen':
        return faPen
      case 'faPencil':
        return faPencil
      case 'faPeopleGroup':
        return faPeopleGroup
      case 'faPeopleRoof':
        return faPeopleRoof
      case 'faPhoneVolume':
        return faPhoneVolume
      case 'faPlus':
        return faPlus
      case 'faTrashCan':
        return faTrashCan
      case 'faThumbsUp':
        return faThumbsUp
      case 'faThumbsDown':
        return faThumbsDown
      case 'faUser':
        return faUser
      case 'faUserGroup':
        return faUserGroup
      case 'faUserPlus' :
        return faUserPlus
      case 'faUsers':
        return faUsers
      case 'faUserTie':
        return faUserTie
      case 'faVideo':
        return faVideo
      case 'faXmark':
        return faXmark
      default:
        return faUser;
    }
  }
}
