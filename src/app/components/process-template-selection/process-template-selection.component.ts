import { ProcessTemplate } from './../../models/processTemplate';
import { Component, Inject, OnInit } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { animate, state, style, transition, trigger } from '@angular/animations';

@Component({
  selector: 'app-process-template-selection',
  templateUrl: './process-template-selection.component.html',
  styleUrls: ['./process-template-selection.component.scss'],
  animations: [
    trigger('detailExpand', [
      state('collapsed', style({height: '0px', minHeight: '0'})),
      state('expanded', style({height: '*'})),
      transition('expanded <=> collapsed', animate('225ms cubic-bezier(0.4, 0.0, 0.2, 1)')),
    ]),
  ],
})
export class ProcessTemplateSelectionComponent implements OnInit {

  processes: ProcessTemplate[];
  selectedProcessId: string;

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

  selectProcess(id: string) {
    this.selectedProcessId = id;
  }
}
