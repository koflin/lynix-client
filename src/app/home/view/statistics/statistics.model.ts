import { UserStatus } from 'src/app/models/user';

export interface UserStat {
  name: string;
  status: UserStatus;
  roleName: string;
}

export interface ProcessTimeStat {
  name: string;
  orderName: string;
  steps: {
    name: string;
    timeTaken: number;
  }[];
}
