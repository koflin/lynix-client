import { ProcessTemplatesService } from './../../../core/processTemplates/process-templates.service';
import { OrdersService } from './../../../core/orders/orders.service';
import { ProcessesService } from './../../../core/processes/processes.service';
import { ProcessNode } from './../../../models/ui/processNode';
import { Injectable, OnInit } from '@angular/core';
import { ProcessGroupNode } from 'src/app/models/ui/processGroupNode';

@Injectable({
  providedIn: 'root'
})
export class ProcessesOverviewService {

  constructor(private processesService: ProcessesService,
              private ordersService: OrdersService,
              private processTemplatesService: ProcessTemplatesService) {
  }

  getAll(): ProcessNode[] {
    return this.processesService.getAll().map((process) => {
      return {
        id: process.id,
        name: process.name,
        status: process.status,
        timeTaken: process.timeTaken,
        selected: false
      };
    });
  }
}
