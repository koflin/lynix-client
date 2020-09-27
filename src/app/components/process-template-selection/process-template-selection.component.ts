import { ProcessTemplate } from './../../models/processTemplate';
import { Component, Inject, OnInit } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-process-template-selection',
  templateUrl: './process-template-selection.component.html',
  styleUrls: ['./process-template-selection.component.scss']
})
export class ProcessTemplateSelectionComponent implements OnInit {

  processes: ProcessTemplate[];
  selectedProcess: ProcessTemplate;

  displayedColumns: string[] = ['id', 'name'];
  dataSource: MatTableDataSource<ProcessTemplate>;
  filter: string;

  constructor(
    public dialogRef: MatDialogRef<ProcessTemplateSelectionComponent>,
    @Inject(MAT_DIALOG_DATA) public data: { options: ProcessTemplate[] }
    ) {
      this.processes = this.data.options;
      this.dataSource = new MatTableDataSource(this.processes);
    }

  ngOnInit(): void {
  }

  applyFilter() {
    this.dataSource.filter = this.filter;
  }
}
