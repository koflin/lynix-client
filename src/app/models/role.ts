export interface Role {
  id: string;
  name: string;
  premissions: Permission[];
}

export type Permission = 'view' | 'execute' | 'edit' | 'assign';
