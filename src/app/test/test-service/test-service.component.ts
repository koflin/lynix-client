import { Tool } from './../../models/tool';
import { ToolsService } from './../../core/tools/tools.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-test-service',
  templateUrl: './test-service.component.html',
  styleUrls: ['./test-service.component.scss']
})
export class TestServiceComponent implements OnInit {

  tools: Tool[];

  constructor(private toolsService: ToolsService) {
  }

  ngOnInit(): void {
    this.toolsService.getAll().subscribe(tools => {
      this.tools = tools;
    });
  }
}
