import { Tool } from './../../../models/tool';
import { ToolsService } from './../../../core/tools/tools.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-tool-library',
  templateUrl: './tool-library.component.html',
  styleUrls: ['./tool-library.component.scss']
})
export class ToolLibraryComponent implements OnInit {

  tools: Tool[];

  constructor(private toolsService: ToolsService) { }

  ngOnInit(): void {
    this.tools = this.toolsService.getAll();
  }
}
