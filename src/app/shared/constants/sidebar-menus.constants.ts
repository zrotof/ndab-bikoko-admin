import { Menu } from "../../core/models/side-bar";
import { RoleEnum } from "../../core/enums/roles.enum";

export const MENU_LIST: Menu[] = [

    {
        icon: 'faChartLine',
        label: "Tableau De Bord",
        allowedRoles : [RoleEnum.SUPER_ADMIN, RoleEnum.ADMIN, RoleEnum.DEPUTY],
        menuItems: [
            { label: "", url: "/tableau-de-board", allowedRoles: [RoleEnum.SUPER_ADMIN, RoleEnum.ADMIN, RoleEnum.DEPUTY] }
        ],
        active: false
    },
    {
        icon: 'faPeopleRoof',
        label: "Groupes",
        allowedRoles : [RoleEnum.SUPER_ADMIN, RoleEnum.ADMIN, RoleEnum.DEPUTY],
        menuItems: [
            { label: "Mes Groupes", url: "/mes-groupes", allowedRoles : [RoleEnum.DEPUTY] },
            { label: "Groupes validés", url: '/groupes', allowedRoles : [RoleEnum.SUPER_ADMIN, RoleEnum.ADMIN] },
            { label: "Groupes en attente", url: "/groupes/attente-de-validation", allowedRoles : [RoleEnum.SUPER_ADMIN, RoleEnum.ADMIN] },
        ],
        active: false
    },
    {
        icon: 'faUsers',
        label: "Adhérents",
        allowedRoles : [RoleEnum.SUPER_ADMIN, RoleEnum.ADMIN],
        menuItems: [
            { label: "Liste", url: "/adherents", allowedRoles : [RoleEnum.SUPER_ADMIN, RoleEnum.ADMIN] },
            { label: "Demandes d'adhésion", url: "/adherents/demandes", allowedRoles : [RoleEnum.SUPER_ADMIN, RoleEnum.ADMIN] }
        ],
        active: false
    },
    {
        icon: 'faNewspaper',
        label: "Blog",
        allowedRoles : [RoleEnum.SUPER_ADMIN, RoleEnum.ADMIN],
        menuItems: [
            { label: "Rubriques", url: "blog/rubriques", allowedRoles : [RoleEnum.SUPER_ADMIN, RoleEnum.ADMIN] },
            { label: "Articles", url: "blog/articles", allowedRoles : [RoleEnum.SUPER_ADMIN, RoleEnum.ADMIN] }
        ],
        active: false
    },
    {
        icon: 'faBriefcase',
        label: "Staff",
        allowedRoles : [RoleEnum.SUPER_ADMIN, RoleEnum.ADMIN],
        menuItems: [
            { label: "Liste", url: "/staffs", allowedRoles : [RoleEnum.SUPER_ADMIN, RoleEnum.ADMIN] },
            { label: "Invitations en attente", url: "/staffs/invitations", allowedRoles : [RoleEnum.SUPER_ADMIN, RoleEnum.ADMIN] }
        ],
        active: false
    }
]