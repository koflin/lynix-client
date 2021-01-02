import { ToolDraftComponent } from './../../../components/tool-draft/tool-draft.component';
import { MatDialog } from '@angular/material/dialog';
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

  constructor(
    private toolsService: ToolsService,
    public dialog: MatDialog,
    ) { }

  ngOnInit(): void {
    this.toolsService.onToolsChange.subscribe(() => {
      this.toolsService.getAll().subscribe(tools => this.tools = tools);
    });
  }

  addTool() {
    const draftDialog = this.dialog.open(ToolDraftComponent, {
      width: '700px',
    });

    draftDialog.afterClosed().subscribe(result => {
      // New process
      if (result) {
        this.toolsService.create(result);
      }
    });
  }

  removeTool(id: string) {
    this.toolsService.delete(id);
  }
}
