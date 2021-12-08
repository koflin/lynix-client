import { UserStatus } from 'src/app/models/user';

export interface UserStat {
  name: string;
  status: UserStatus;
  roleName: string;
}

export interface ProcessTimeStat {
  id: string;
  name: string;
  orderName: string;
  steps: {
    name: string;
    timeTaken: number;
  }[];
}

export interface OrderTimeStat {
  id: string;
  name: string;
  timeTaken: number;
}
