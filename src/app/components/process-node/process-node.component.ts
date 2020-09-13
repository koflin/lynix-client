import { ProcessNode } from './../../models/ui/processNode';
import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-process-node',
  templateUrl: './process-node.component.html',
  styleUrls: ['./process-node.component.scss']
})
export class ProcessNodeComponent implements OnInit {

  @Input() processNode: ProcessNode;
  @Output() selectChange = new EventEmitter<boolean>();

  constructor() { }

  ngOnInit(): void {
  }

  select() {
    this.selectChange.emit(!this.processNode.selected);
  }

  getHours(seconds: number) {
    return Math.round(seconds / 360) / 10;
  }
}
