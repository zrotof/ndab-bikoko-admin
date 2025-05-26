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
        icon: 'faUsers',
        label: "Membres",
        allowedRoles : [RoleEnum.SUPER_ADMIN, RoleEnum.ADMIN, RoleEnum.DEPUTY],
        menuItems: [
            { label: "⁠Adhésions", url: "/mes-groupes", allowedRoles : [RoleEnum.DEPUTY] },
            { label: "⁠Statistiques", url: '/groupes', allowedRoles : [RoleEnum.SUPER_ADMIN, RoleEnum.ADMIN] },
            { label: "⁠Rapports", url: '/groupes', allowedRoles : [RoleEnum.SUPER_ADMIN, RoleEnum.ADMIN] },
            { label: "⁠Paramètres", url: '/groupes', allowedRoles : [RoleEnum.SUPER_ADMIN, RoleEnum.ADMIN] },
        ],
        active: false
    },
    {
        icon: 'faCalendarAlt',
        label: "Évènements",
        allowedRoles : [RoleEnum.SUPER_ADMIN, RoleEnum.ADMIN, RoleEnum.DEPUTY],
        menuItems: [
            { label: "Créer évènement", url: "/evenements/creer", allowedRoles : [RoleEnum.DEPUTY] },
            { label: "Liste des évênements", url: '/evenements', allowedRoles : [RoleEnum.SUPER_ADMIN, RoleEnum.ADMIN] },
        ],
        active: false
    },
    {
        icon: 'faCalendarAlt',
        label: "Blog",
        allowedRoles : [RoleEnum.SUPER_ADMIN, RoleEnum.ADMIN, RoleEnum.DEPUTY],
        menuItems: [
            { label: "Créer rubrique", url: "/blog/rubriques/creer", allowedRoles : [RoleEnum.DEPUTY] },
            { label: "Créer article", url: "/blog/articles/creer", allowedRoles : [RoleEnum.DEPUTY] },
            { label: "Liste des rubriques", url: '/blog/rubriques', allowedRoles : [RoleEnum.SUPER_ADMIN, RoleEnum.ADMIN] },
            { label: "Liste des articles", url: '/blog/articles', allowedRoles : [RoleEnum.SUPER_ADMIN, RoleEnum.ADMIN] },
        ],
        active: false
    },
    {
        icon: 'faHandHoldingMedical',
        label: "Dons",
        allowedRoles : [RoleEnum.SUPER_ADMIN, RoleEnum.ADMIN, RoleEnum.DEPUTY],
        menuItems: [
            { label: "⁠Campagnes", url: "/mes-groupes", allowedRoles : [RoleEnum.DEPUTY] },
            { label: "⁠Donateurs", url: "/mes-groupes", allowedRoles : [RoleEnum.DEPUTY] },
            { label: "⁠Organisations", url: '/groupes', allowedRoles : [RoleEnum.SUPER_ADMIN, RoleEnum.ADMIN] },
            { label: "⁠Rapports", url: "/groupes/attente-de-validation", allowedRoles : [RoleEnum.SUPER_ADMIN, RoleEnum.ADMIN] },
            { label: "⁠Paramètres", url: "/groupes/attente-de-validation", allowedRoles : [RoleEnum.SUPER_ADMIN, RoleEnum.ADMIN] }
        ],
        active: false
    },
    {
        icon: 'faEuroSign',
        label: "Paiements",
        allowedRoles : [RoleEnum.SUPER_ADMIN, RoleEnum.ADMIN, RoleEnum.DEPUTY],
        menuItems: [
            { label: "⁠Inscriptions / Réinscriptions", url: "/mes-groupes", allowedRoles : [RoleEnum.DEPUTY] },
            { label: "⁠Renflouages solidarité", url: "/mes-groupes", allowedRoles : [RoleEnum.DEPUTY] },
            { label: "⁠Rapports", url: '/groupes', allowedRoles : [RoleEnum.SUPER_ADMIN, RoleEnum.ADMIN] },
            { label: "⁠Paramètres", url: "/groupes/attente-de-validation", allowedRoles : [RoleEnum.SUPER_ADMIN, RoleEnum.ADMIN] },
        ],
        active: false
    },
    {
        icon: 'faCircleDollarToSlot',
        label: "Comptabilité",
        allowedRoles : [RoleEnum.SUPER_ADMIN, RoleEnum.ADMIN],
        menuItems: [
            { label: "⁠Recettes", url: "/adherents", allowedRoles : [RoleEnum.SUPER_ADMIN, RoleEnum.ADMIN] },
            { label: "⁠Dépenses", url: "/adherents/demandes", allowedRoles : [RoleEnum.SUPER_ADMIN, RoleEnum.ADMIN] },
            { label: "⁠Rapports", url: "/adherents", allowedRoles : [RoleEnum.SUPER_ADMIN, RoleEnum.ADMIN] },
            { label: "⁠Paramètres", url: "/adherents/demandes", allowedRoles : [RoleEnum.SUPER_ADMIN, RoleEnum.ADMIN] }
        ],
        active: false
    },
    {
        icon: 'faArrowUp19',
        label: "Données",
        allowedRoles : [RoleEnum.SUPER_ADMIN, RoleEnum.ADMIN],
        menuItems: [
            { label: "⁠Objets", url: "blog/rubriques", allowedRoles : [RoleEnum.SUPER_ADMIN, RoleEnum.ADMIN] },
            { label: "⁠Rapports", url: "blog/articles", allowedRoles : [RoleEnum.SUPER_ADMIN, RoleEnum.ADMIN] }
        ],
        active: false
    },
    {
        icon: 'faBriefcase',
        label: "Contacts",
        allowedRoles : [RoleEnum.SUPER_ADMIN, RoleEnum.ADMIN],
        menuItems: [
            { label: "⁠Organisations", url: "/staffs", allowedRoles : [RoleEnum.SUPER_ADMIN, RoleEnum.ADMIN] },
            { label: "⁠Rapports", url: "/staffs/invitations", allowedRoles : [RoleEnum.SUPER_ADMIN, RoleEnum.ADMIN] },
            { label: "⁠Paramètres", url: "/staffs/invitations", allowedRoles : [RoleEnum.SUPER_ADMIN, RoleEnum.ADMIN] }
        ],
        active: false
    },
    {
        icon: 'faBriefcase',
        label: "Témoignages",
        allowedRoles : [RoleEnum.SUPER_ADMIN, RoleEnum.ADMIN, RoleEnum.DEPUTY],
        menuItems: [
            { label: "", url: "/temoignages", allowedRoles: [RoleEnum.SUPER_ADMIN, RoleEnum.ADMIN, RoleEnum.DEPUTY] }
        ],
        active: false
    },
    {
        icon: 'faBriefcase',
        label: "Utilisateurs",
        allowedRoles : [RoleEnum.SUPER_ADMIN, RoleEnum.ADMIN, RoleEnum.DEPUTY],
        menuItems: [
            { label: "", url: "/tableau-de-board", allowedRoles: [RoleEnum.SUPER_ADMIN, RoleEnum.ADMIN, RoleEnum.DEPUTY] }
        ],
        active: false
    }
]