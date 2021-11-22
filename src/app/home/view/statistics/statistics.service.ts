import { Injectable } from '@angular/core';
import { ApiService } from 'src/app/core/api/api.service';

import { ProcessTimeStat, UserStat } from './statistics.model';

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

  getProcessTimes(from: Date, to: Date, templateId: string) {
    return this.apiService.get<ProcessTimeStat[]>('statistics/processes/time', { from, to, templateId });
  }
}
