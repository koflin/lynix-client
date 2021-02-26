export interface Role {
  id: string;
  name: string;
  premissions: Permission[];
}

export enum Permission {
  VIEW = 'view',
  EXECUTE = 'execute',
  EDIT = 'edit',
  ASSIGN = 'assign'
}
