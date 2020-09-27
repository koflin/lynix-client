import { Tool } from './../../models/tool';
import { Component, Input, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-tool-node',
  templateUrl: './tool-node.component.html',
  styleUrls: ['./tool-node.component.scss']
})
export class ToolNodeComponent implements OnInit {

  @Input() tool: Tool;

  constructor() { }

  ngOnInit(): void {
  }

  edit() {
    alert('Not implemented yet');
  }
}
