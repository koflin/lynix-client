import { Component, OnInit } from '@angular/core';
import { Permission } from 'src/app/models/role';
import { DashboardStats } from 'src/app/models/ui/dashboardStats';

import { DashboardService } from './dashboard.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {

  stats: DashboardStats;
  permissions = Permission;

  constructor(
    private dashboardService: DashboardService
  ) {
  }

  ngOnInit(): void {
    this.dashboardService.onUpdate.subscribe((stats) => this.stats = stats);
  }

}
