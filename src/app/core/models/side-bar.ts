export interface Menu {

  icon: string,
  label: string,
  active: boolean,
  allowedRoles: string[],
  menuItems: MenuItem[]
}

export interface MenuItem{
  label: string,
  url: string,
  allowedRoles: string[];
}