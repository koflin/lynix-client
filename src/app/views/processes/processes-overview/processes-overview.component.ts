import { Router } from '@angular/router';
import { ProcessesService } from './../../../core/processes/processes.service';
import { ProcessesOverviewService } from './processes-overview.service';
import { Component, OnInit } from '@angular/core';
import { ProcessGroupNode } from 'src/app/models/ui/processGroupNode';
import * as moment from 'moment';

@Component({
  selector: 'app-processes-overview',
  templateUrl: './processes-overview.component.html',
  styleUrls: ['./processes-overview.component.scss']
})
export class ProcessesOverviewComponent implements OnInit {

  processNodeGroups: ProcessGroupNode[] = [
    {
      title: 'Assistance Required',
      status: 'assistance_required',
      nodes: []
    },
    {
      title: 'In Preparation',
      status: 'in_preparation',
      nodes: []
    },
    {
      title: 'Released',
      status: 'released',
      nodes: []
    },
    {
      title: 'Work in progress',
      status: 'in_progress',
      nodes: []
    },
    {
      title: 'Completed',
      status: 'completed',
      nodes: []
    }
  ];

  constructor(
    private router: Router,
    private processesOverviewService: ProcessesOverviewService,
    private processesService: ProcessesService
    ) {
  }

  ngOnInit(): void {
    this.update();
  }

  onSelect(id: string) {
    this.processNodeGroups.forEach((group) => {
      group.nodes.forEach((node) => {
        if (node.id === id) {
          node.selected = !node.selected;
        }
      });
    });
  }

  onStart(id: string) {
    this.processesService.start(id);
    this.update();
    this.router.navigate(['guide/' + id]);
  }

  update() {
    const processNodes = this.processesOverviewService.getAll();

    this.processNodeGroups.forEach((group) => {
      group.nodes = [];
      group.nodes.push(...processNodes.filter((node) => node.status === group.status));
    });
  }
}
