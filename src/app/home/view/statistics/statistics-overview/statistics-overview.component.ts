import { AfterViewInit, Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { Chart } from 'chart.js';
import { template } from 'lodash';
import moment from 'moment';
import { ProcessTemplatesService } from 'src/app/core/processTemplates/process-templates.service';
import { RouteInfo } from 'src/app/helpers/routeInfo';
import { OrderStatus } from 'src/app/models/order';
import { ProcessStatus } from 'src/app/models/process';
import { BreadCrumbInfo } from 'src/app/models/ui/breadCrumbInfo';
import { DatetimePipe } from 'src/app/pipes/datetime/datetime.pipe';
import { DurationUnitPipe } from 'src/app/pipes/duration/duration-unit.pipe';
import { StatusPipe } from 'src/app/pipes/status/status.pipe';
import { CheckboxSelectOption } from 'src/app/shared/models/checkbox-select-option';
import { InputOutputValue, SingleMultiChoiceItem } from 'src/app/shared/models/InputOutputValue';

import { UserStat } from '../statistics.model';
import { StatisticsService } from '../statistics.service';

@Component({
  selector: 'app-statistics-overview',
  templateUrl: './statistics-overview.component.html',
  styleUrls: ['./statistics-overview.component.scss']
})
export class StatisticsOverviewComponent implements OnInit, AfterViewInit {

  breadCrumbs: BreadCrumbInfo[]=[{ name: $localize `Statistics Overview`, url: new RouteInfo(this.router.url) },];
  stats: any = {};

  colors = [
    'rgba(255, 99, 132)',
    'rgba(255, 159, 64)',
    'rgba(255, 205, 86)',
    'rgba(75, 192, 192)',
    'rgba(54, 162, 235)',
    'rgba(153, 102, 255)'
  ];

  orderNowChart: Chart;
  orderHistoryChart: Chart;
  processNowChart: Chart;
  processHistoryChart: Chart;

  @ViewChild('orderNow') orderNow: ElementRef;
  @ViewChild('orderHistory') orderHistory: ElementRef;
  @ViewChild('processNow') processNow: ElementRef;
  @ViewChild('processHistory') processHistory: ElementRef;

  userStats: UserStat[];

  // Process Stats
  processTo: Date = moment().toDate();
  processFrom: Date = moment().subtract(1, 'week').toDate();
  processTemplate: SingleMultiChoiceItem = null;
  processTemplateOptions: SingleMultiChoiceItem[];
  processTimeStatsChart: Chart;
  processStatusOptions: CheckboxSelectOption<ProcessStatus>[] = Object.values(ProcessStatus).map((status) => {
    return { name: this.statusPipe.transform(status), value: status };
  });
  processSelectedStatusOptions: CheckboxSelectOption<ProcessStatus>[];
  @ViewChild('processTimeStatsEl') processTimeStatsRef: ElementRef;

  // Order Stats
  orderTo: Date = moment().toDate();
  orderFrom: Date = moment().subtract(1, 'week').toDate();
  orderTimeStatsChart: Chart;
  orderStatusOptions: CheckboxSelectOption<OrderStatus>[] = Object.values(OrderStatus).map((status) => {
    return { name: this.statusPipe.transform(status), value: status };
  });
  orderSelectedStatusOptions: CheckboxSelectOption<OrderStatus>[];
  @ViewChild('orderTimeStatsEl') orderTimeStatsRef: ElementRef;

  // IO
  fromDateIO = new InputOutputValue("fromdate", $localize `From`, false);
  toDateIO = new InputOutputValue("todate", $localize `To`, false);
  dateRangeIO = new InputOutputValue("dateRange", $localize `From - To`, false);
  processTemplateIO = new InputOutputValue("processTemplate", $localize `Process Template`, false);

  format = 'DD.MM.YYYY';

  labelLimit = 8;

  constructor(
    private router: Router,
    private statisticsService: StatisticsService,
    private processTemplatesSerivce: ProcessTemplatesService,
    private dateTimePipe: DatetimePipe,
    private statusPipe: StatusPipe,
    private durationUnitPipe: DurationUnitPipe
  ) {
    this.processSelectedStatusOptions = [...this.processStatusOptions];
    this.orderSelectedStatusOptions = [...this.orderStatusOptions];
  }

  ngOnInit(): void {
    this.statisticsService.getUsers().subscribe((data) => {
      this.userStats = data;
    });

    this.processTo = moment().toDate();
    this.processFrom = moment().subtract(1, 'week').toDate();

    this.orderTo = moment().toDate();
    this.orderFrom = moment().subtract(1, 'week').toDate();

    this.searchProcessTemplates(undefined);
  }

  ngAfterViewInit(): void {

    this.processTimeStatsChart = new Chart(this.processTimeStatsRef.nativeElement, {
      type: 'bar',
      options: {
        scales: {
          xAxes: [{
            stacked: true
          }],
          yAxes: [{
            stacked: true,
            beginAtZero: true,
            scaleLabel: {
              labelString: $localize `seconds`,
              display: true
            }
          }]
        },
        title: {
          display: true,
          text: $localize `Select a date range and a process template`,
        }
      }
    });

    this.orderTimeStatsChart = new Chart(this.orderTimeStatsRef.nativeElement, {
      type: 'bar',
      options: {
        scales: {
          xAxes: [{
            stacked: false
          }],
          yAxes: [{
            stacked: false,
            beginAtZero: true,
            scaleLabel: {
              labelString: $localize `seconds`,
              display: true
            }
          }]
        },
        title: {
          display: true,
          text: $localize `Select a date range`,
        }
      }
    });

    this.updateProcess();
    this.updateOrder();

    /* this.orderNowChart = new Chart(this.orderNow.nativeElement, {
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
            data: [75, 55, 78, 80, 83, 83, 86, 84, 80, 90, 91, 90, 88],
            backgroundColor: '#2C3E50',
          },
          {
            label: $localize `Finished`,
            data: [30, 20, 24, 30, 36, 40, 45, 40, 43, 40, 47, 56, 54],
            backgroundColor: '#2ECC71',
          },
        ]
      },
      options: {
        scales: {
          y: {
            beginAtZero: true,
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

    */
  }

  updateProcess() {
    if (!this.processTemplate) {
      this.clearProcess();
      return;
    }

    this.statisticsService.getProcessTimes(
      this.processFrom,
      this.processTo,
      this.processTemplate.value.toString(),
      this.processSelectedStatusOptions.map(option => option.value)
    ).subscribe(data => {

      if (data == undefined || data.length == 0) {
        this.clearProcess();
        return;
      }

      const timeData = data[0].steps.map((t, i) => data.map(process => process.steps[i].timeTaken ?? 0));
      const normalized = this.normalizeData(timeData);
      const amountOfSteps = data[0].steps?.length;

      this.processTimeStatsChart.data = {
        labels: data.map(process => process.orderName),
        datasets: data[0].steps.map((template, i) => {

          return {
            label: amountOfSteps > this.labelLimit ? undefined : template.name,
            backgroundColor: this.colors[i % this.colors.length],
            data: normalized.data[i]
          }
        })
      };

      this.processTimeStatsChart.options.scales.yAxes[0].scaleLabel.labelString = this.durationUnitPipe.transform(normalized.unit);

      this.processTimeStatsChart.options.title = {
        display: true,
        text: `${this.processTemplate.label}: ${this.dateTimePipe.transform(this.processFrom, this.format)} - ${this.dateTimePipe.transform(this.processTo, this.format)}`
      };

      this.processTimeStatsChart.update();
    });
  }

  clearProcess() {
    this.processTimeStatsChart.data.labels = [];
    this.processTimeStatsChart.data.datasets = [];
    this.processTimeStatsChart.options.title = {
      display: true,
      text: $localize `Select a date range and a process template`,
    };
    this.processTimeStatsChart.update();
  }

  selectProcessTemplate(item: SingleMultiChoiceItem) {
    this.processTemplate = item;

    this.updateProcess();
  }

  async searchProcessTemplates(text: string) {
    this.processTemplateOptions = (await this.processTemplatesSerivce.search(text, 20).toPromise()).map((template) => {
      return {
        value: template.id,
        label: template.name,
      }
    });
  }

  updateOrder() {
    this.statisticsService.getOrderTimes(this.orderFrom, this.orderTo, this.orderSelectedStatusOptions.map(option => option.value)).subscribe(data => {

      if (data == undefined || data.length == 0) {
        this.clearOrder();
        return;
      }

      const orderTime = data.map(order => order.timeTaken ?? 0);
      const normalized = this.normalizeData(orderTime);

      this.orderTimeStatsChart.data = {
        labels: data.map(order => order.name),
        datasets: [{
          label: $localize `Total Time Taken`,
          backgroundColor: this.colors[0],
          data: normalized.data
        }]
      };

      this.orderTimeStatsChart.options.scales.yAxes[0].scaleLabel.labelString = this.durationUnitPipe.transform(normalized.unit);

      this.orderTimeStatsChart.options.title = {
        display: true,
        text: `Orders: ${this.dateTimePipe.transform(this.orderFrom, this.format)} - ${this.dateTimePipe.transform(this.orderTo, this.format)}`
      };

      this.orderTimeStatsChart.update();
    });
  }

  clearOrder() {
    this.orderTimeStatsChart.data.labels = [];
    this.orderTimeStatsChart.data.datasets = [];
    this.orderTimeStatsChart.options.title = {
      display: true,
      text: $localize `Select a date range`,
    };
    this.orderTimeStatsChart.update();
  }

  private normalizeData<T extends number | number[]>(data: T[], max?: number): { data: T[], unit: moment.unitOfTime.Base } {
    let unit: moment.unitOfTime.Base;

    if (!data || data.length == 0) {
      return { data: [], unit: 'seconds' };
    }

    if (max === undefined) {
      max = Math.max(...data.flat(2));
    }

    if (max >= 60*60) {
      unit = 'hours';
    } else if (max >= 60) {
      unit = 'minutes';
    } else {
      unit = 'seconds';
    }

    if (Array.isArray(data[0])) {
      return {
        data: <T[]>(<number[][]>data).map(subData => this.normalizeData(subData, max).data),
        unit
      };
    } else {
      return {
        data: <T[]>(<number[]>data).map(value => parseFloat(moment.duration(value, 'seconds').as(unit).toFixed(1))),
        unit
      };
    }
  }
}
