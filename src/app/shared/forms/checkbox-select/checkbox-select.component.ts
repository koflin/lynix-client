import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

import { CheckboxSelectOption } from '../../models/checkbox-select-option';

let id = 0;

@Component({
  selector: 'app-checkbox-select',
  templateUrl: './checkbox-select.component.html',
  styleUrls: ['./checkbox-select.component.scss']
})
export class CheckboxSelectComponent implements OnInit {

  @Input() selectedOptions: CheckboxSelectOption<any>[];
  @Output() selectedOptionsChange= new EventEmitter<CheckboxSelectOption<any>[]>();

  @Input() options: CheckboxSelectOption<any>[];
  @Input() name: string;
  @Input() showTags: boolean = true;

  selectedOptionTags: { display: string, value: string }[];

  idPrefix: number;

  constructor() {
    this.idPrefix = id++;
  }

  ngOnInit(): void {
    this.refreshTags();
  }

  changeSelected(option: CheckboxSelectOption<any>, changeEvent: any) {
    if (changeEvent.target.checked) {
      this.selectedOptions.push(option);
    } else {
      this.selectedOptions.splice(this.selectedOptions.indexOf(option), 1);
    }

    this.selectedOptionsChange.emit(this.selectedOptions);
    this.refreshTags();
  }

  refreshTags() {
    if (this.showTags) {
      // Update tags
      this.selectedOptionTags = this.selectedOptions.map((option) => {
        return {
          display: option.name,
          value: option.value
        };
      });
    }
  }
}
