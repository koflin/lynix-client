export interface Role {
  id: string;
  name: string;
  permissions: Permission[];
}

export enum Permission {
  VIEW = 'view',
  EXECUTE = 'execute',
  EDIT = 'edit',
  ASSIGN = 'assign'
}
