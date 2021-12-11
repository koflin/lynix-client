import { Injectable } from '@angular/core';
import { ApiService } from 'src/app/core/api/api.service';
import { OrderStatus } from 'src/app/models/order';
import { ProcessStatus } from 'src/app/models/process';

import { OrderTimeStat, ProcessTimeStat, UserStat } from './statistics.model';

@Injectable({
  providedIn: 'root'
})
export class StatisticsService {

  constructor(
    private apiService: ApiService
  ) { }

  getUsers() {
    return this.apiService.get<UserStat[]>('statistics/users');
  }

  getProcessTimes(from: Date, to: Date, templateId: string, status?: ProcessStatus[]) {
    return this.apiService.get<ProcessTimeStat[]>('statistics/processes/time', { from, to, templateId, status });
  }

  getOrderTimes(from: Date, to: Date, status?: OrderStatus[]) {
    return this.apiService.get<OrderTimeStat[]>('statistics/orders/time', { from, to, status });
  }
}
