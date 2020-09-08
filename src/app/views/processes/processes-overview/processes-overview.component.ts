import { ProcessesService } from './../../../core/processes/processes.service';
import { Component, OnInit } from '@angular/core';
import { Process } from 'src/app/models/process';

@Component({
  selector: 'app-processes-overview',
  templateUrl: './processes-overview.component.html',
  styleUrls: ['./processes-overview.component.scss']
})
export class ProcessesOverviewComponent implements OnInit {

  sortedProcesses: [{ status: string, processes: Process[] }];

  constructor(private processesService: ProcessesService) {

  }

  ngOnInit(): void {
  }

}
