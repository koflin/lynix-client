import { AfterViewInit, Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { Chart } from 'chart.js';
import { BreadCrumbInfo } from 'src/app/models/ui/breadCrumbInfo';

@Component({
  selector: 'app-statistics-overview',
  templateUrl: './statistics-overview.component.html',
  styleUrls: ['./statistics-overview.component.scss']
})
export class StatisticsOverviewComponent implements OnInit, AfterViewInit {

  breadCrumbs: BreadCrumbInfo[]=[{ name: $localize `Statistics Overview`, url: this.router.url },];
  stats: any = {};
  users = [
    { name: "Colin Pfingstl", status: "Online", role: "Developer" },
    { name: "Lars Streit", status: "Offline", role: "Process Admin" },
    { name: "Dominik Koster", status: "Offline", role: "Process Admin" },
  ];

  orderNowChart: Chart;
  orderHistoryChart: Chart;
  processNowChart: Chart;
  processHistoryChart: Chart;

  @ViewChild('orderNow') orderNow: ElementRef;
  @ViewChild('orderHistory') orderHistory: ElementRef;
  @ViewChild('processNow') processNow: ElementRef;
  @ViewChild('processHistory') processHistory: ElementRef;

  constructor(
    private router: Router
  ) { }

  ngOnInit(): void {
  }

  ngAfterViewInit(): void {
    this.orderNowChart = new Chart(this.orderNow.nativeElement, {
      type: 'doughnut',
      data: {
        labels: [
          $localize `Open`,
          $localize `In Progress`,
          $localize `Finished`
        ],
        datasets: [{
          label: 'Orders Now',
          data: [200, 60, 120],
          backgroundColor: [
            '#2C3E50',
            '#3498DB',
            '#2ECC71'
          ],
          hoverOffset: 4
        }]
      }
    });

    this.orderHistoryChart = new Chart(this.orderHistory.nativeElement, {
      type: 'bar',
      data: {
        labels: [
          'January',
          'February',
          'March',
          'April',
          'May',
          'June',
          'July',
          'August',
          'September',
          'October',
          'November',
          'December'
        ],
        datasets: [
          {
            label: $localize `Open`,
            data: [75, 55, 78, 80, 83, 83, 86, 84, 80, 90, 91, 90],
            backgroundColor: '#2C3E50',
          },
          {
            label: $localize `Finished`,
            data: [30, 24, 30, 36, 40, 45, 40, 43, 40, 47, 56, 54],
            backgroundColor: '#2ECC71',
          },
        ]
      },
      options: {
        scales: {
          y: {
            beginAtZero: true
          }
        }
      }
    });

    this.processNowChart = new Chart(this.processNow.nativeElement, {
      type: 'doughnut',
      data: {
        labels: [
          $localize `Open`,
          $localize `In Progress`,
          $localize `Finished`
        ],
        datasets: [{
          label: 'Orders Now',
          data: [300, 50, 100],
          backgroundColor: [
            '#2C3E50',
            '#3498DB',
            '#2ECC71'
          ],
          hoverOffset: 4
        }]
      }
    });

    this.processHistoryChart = new Chart(this.processHistory.nativeElement, {
      type: 'bar',
      data: {
        labels: [
          'January',
          'February',
          'March',
          'April',
          'May',
          'June',
          'July',
          'August',
          'September',
          'October',
          'November',
          'December'
        ],
        datasets: [
          {
            label: $localize `Open`,
            data: [73, 20, 67, 70, 85, 70, 77, 88, 82, 89, 93, 40],
            backgroundColor: '#2C3E50',
          },
          {
            label: $localize `Finished`,
            data: [35, 8, 33, 40, 42, 38, 47, 30, 33, 40, 60, 20],
            backgroundColor: '#2ECC71',
          },
        ]
      },
      options: {
        scales: {
          y: {
            beginAtZero: true
          }
        }
      }
    });
  }

}
