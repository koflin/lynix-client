import { Component, OnInit } from '@angular/core';
import Chart from "chart.js";
import { chartBarStackedData } from './chart-bar-example-data';

@Component({
  selector: 'app-chart-bar-staked',
  templateUrl: './chart-bar-staked.component.html',
  styleUrls: ['./chart-bar-staked.component.scss']
})
export class ChartBarStakedComponent implements OnInit {
  chartBarStacked
  barStackedChart
  options: {
    tooltips: {
      mode: "index",
      intersect: false
    },
    responsive: true,
    scales: {
      xAxes: [
        {
          stacked: true
        }
      ],
      yAxes: [
        {
          stacked: true
        }
      ]
    }
  }
  constructor() { }

  ngOnInit(): void {
    this.chartBarStacked = document.getElementById("chart-bar-stacked");
    this.barStackedChart = new Chart(this.chartBarStacked , {
      type: "bar",
      data: chartBarStackedData.data,
      options: this.options
    });
  }

}
