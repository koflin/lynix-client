import { Permission } from '../role';

export interface MenuGroup {
  name: string;
  icon: string;
  background: string;
  items: MenuItem[];
}

export interface MenuItem {
  name: string;
  route: string;
  return?: string;
  neededPermissions: Permission[] | Permission;
}
