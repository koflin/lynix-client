import { ProcessTemplatesService } from './../../core/processTemplates/process-templates.service';
import { ProductTemplate } from './../../models/productTemplate';
import { Component, Input, OnInit, Output, EventEmitter, SimpleChanges, OnChanges, DoCheck } from '@angular/core';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { ProcessTemplateSelectionComponent } from '../process-template-selection/process-template-selection.component';

@Component({
  selector: 'app-product-template-tab',
  templateUrl: './product-template-tab.component.html',
  styleUrls: ['./product-template-tab.component.scss']
})
export class ProductTemplateTabComponent implements OnInit, DoCheck {

  subSelect = 0;

  @Input() selectedTab: number;
  @Input() productTemplate: ProductTemplate;
  @Output() productTemplateChange = new EventEmitter<ProductTemplate>();

  constructor(
    public dialog: MatDialog,
    private processTemplatesService: ProcessTemplatesService
    ) { }

  ngDoCheck(): void {
    //this.productTemplateChange.emit(this.productTemplate);
  }

  ngOnInit(): void {
  }

  addProcess() {
    // Filter non selected process templates
    const options = this.processTemplatesService.getAll().filter((process) => {
      return this.productTemplate.processTemplates.findIndex(processUsed => processUsed.id === process.id) === -1;
    });

    const selectDialog = this.dialog.open(ProcessTemplateSelectionComponent, {
      width: '700px',
      data: {
        options
      }
    });

    selectDialog.afterClosed().subscribe(result => {
      // New process
      if (result === true) {
        this.productTemplate.processTemplates.push(this.processTemplatesService.create({
          companyId: null,
          id: null,
          name: 'Unnamed Process ' + (this.productTemplate.processTemplates.length + 1),
          estimatedTime: null,
          mainTasks: [],
          stepTemplates: [],
          previousComments: null,
        }));
      } else if (result) {
        this.productTemplate.processTemplates.push(this.processTemplatesService.getById(result));
      }
    });
  }

  removeProcess(index: number) {
    this.productTemplate.processTemplates.splice(index, 1);
  }

  editProcess(index: number) {
    this.selectedTab = index + 1;
  }

  selectTab(index: number) {
    this.selectedTab = index;
    this.subSelect = 0;
  }
}
