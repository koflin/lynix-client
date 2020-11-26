import { Tool } from './../../models/tool';
import { Component, Input, OnInit, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-tool-node',
  templateUrl: './tool-node.component.html',
  styleUrls: ['./tool-node.component.scss']
})
export class ToolNodeComponent implements OnInit {

  @Input() tool: Tool;
  @Output() toolRemove = new EventEmitter();

  constructor() { }

  ngOnInit(): void {
  }

  edit() {
    alert('Not implemented yet');
  }

  remove() {
    this.toolRemove.emit(this.tool.id);
  }
}
