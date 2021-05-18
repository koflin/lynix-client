import { Role } from 'src/app/models/role';

import { CompanyBase } from './companyBase';

export interface User extends CompanyBase {
  id: string;
  email: string;
  displayName: string;
  firstName?: string;
  lastName?: string;
  role?: Role;
  avatar?: string;
  activatedAt?: Date;
}

export enum UserStatus {
  ONLINE = 'online',
  OFFLINE = 'offline'
}

export enum UserActivity {
  IDLE = 'idle',
  GUIDE = 'guide'
}
