import { Role } from 'src/app/models/role';

import { CompanyBase } from './base/companyBase';
import { MetadataEntity } from './base/metadata';

export interface User extends CompanyBase, MetadataEntity {
  id: string;
  email: string;
  displayName: string;
  firstName?: string;
  lastName?: string;
  role?: Role;
  avatar?: string;
  activatedAt?: Date;

  companyLogo?: string;
}

export enum UserStatus {
  ONLINE = 'online',
  OFFLINE = 'offline'
}

export enum UserActivity {
  IDLE = 'idle',
  GUIDE = 'guide'
}
