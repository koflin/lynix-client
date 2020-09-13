import { ProcessesOverviewService } from './processes-overview.service';
import { Component, OnInit } from '@angular/core';
import { ProcessGroupNode } from 'src/app/models/ui/processGroupNode';

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

  constructor(private processesOverviewService: ProcessesOverviewService) {
  }

  ngOnInit(): void {
    const processNodes = this.processesOverviewService.getAll();

    this.processNodeGroups.forEach((group) => {
      group.nodes.push(...processNodes.filter((node) => node.status === group.status));
    });
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
}
