import { Tool } from './../../models/tool';
import { Component, OnInit } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-tool-draft',
  templateUrl: './tool-draft.component.html',
  styleUrls: ['./tool-draft.component.scss']
})
export class ToolDraftComponent implements OnInit {

  toolDraft: Tool;

  constructor(public dialogRef: MatDialogRef<ToolDraftComponent>) { }

  ngOnInit(): void {
    this.toolDraft = {
      id: null,
      name: '',
    };
  }

  create() {
    this.dialogRef.close(this.toolDraft);
  }

}
