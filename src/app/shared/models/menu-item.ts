import { IconDefinition } from "@fortawesome/free-solid-svg-icons";

export interface MenuItemLink {
    label: string;
    link: string;
    menuItemRoles: string[];
}

export interface MenuItem {
    icon: IconDefinition;
    label: string;
    active: boolean;
    menuItems: MenuItemLink[];
    roles: string[];
}

