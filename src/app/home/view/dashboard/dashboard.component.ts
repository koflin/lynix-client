import { Component, OnInit } from '@angular/core';
import { Permission } from 'src/app/models/role';
import { DashboardStats } from 'src/app/models/ui/dashboardStats';

import { MenuGroup } from './../../../models/ui/menuGroup';
import { DashboardService } from './dashboard.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {

  stats: DashboardStats;
  menu: MenuGroup[];

  constructor(
    private dashboardService: DashboardService
  ) {
  }

  ngOnInit(): void {
    this.dashboardService.onUpdate.subscribe((stats) => this.stats = stats);
    this.dashboardService.getMenu().then((menu) => this.menu = menu);
  }

  getGroupPermissions(group: MenuGroup): (Permission | Permission[])[] {
    return group.items.map(item => item.neededPermissions);
  }
}
