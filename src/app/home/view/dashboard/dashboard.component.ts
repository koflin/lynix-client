import { DashboardService } from './dashboard.service';
import { Component, OnInit } from '@angular/core';
import { DashboardStats } from 'src/app/models/ui/dashboardStats';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {

  stats: DashboardStats;

  constructor(
    private dashboardService: DashboardService
  ) { }

  ngOnInit(): void {
    this.dashboardService.onUpdate.subscribe((stats) => this.stats = stats);
  }

}
