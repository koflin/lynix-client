import { Role } from 'src/app/models/role';

import { CompanyBase } from './companyBase';

export interface User extends CompanyBase {
  id: string;
  password?: string;
  username: string;
  firstName?: string;
  lastName?: string;
  role?: Role;
  avatar?: string;
}

export enum UserStatus {
  ONLINE = 'online',
  OFFLINE = 'offline'
}

export enum UserActivity {
  IDLE = 'idle',
  GUIDE = 'guide'
}
