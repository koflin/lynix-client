import { ProcessTemplateNode } from './../../models/ui/processTemplateNode';
import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-process-template-node',
  templateUrl: './process-template-node.component.html',
  styleUrls: ['./process-template-node.component.scss']
})
export class ProcessTemplateNodeComponent implements OnInit {

  @Input() templateNode: ProcessTemplateNode;
  @Output() selectChange = new EventEmitter<boolean>();

  constructor() { }

  ngOnInit(): void {
  }

  edit() {
    alert('Not implemented yet');
  }

  select() {
    this.selectChange.emit(!this.templateNode.selected);
  }
}
