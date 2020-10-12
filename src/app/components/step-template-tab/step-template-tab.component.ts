import { StepTemplate } from './../../models/stepTemplate';
import { Component, Input, OnInit, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-step-template-tab',
  templateUrl: './step-template-tab.component.html',
  styleUrls: ['./step-template-tab.component.scss']
})
export class StepTemplateTabComponent implements OnInit {

  @Input() stepTemplate: StepTemplate;
  @Output() stepTemplateChange = new EventEmitter<StepTemplate>();

  materialToAdd: string;
  toolToAdd: string;

  currentImageIndex: number;
  currentVideoIndex: number;

  imageFile: File;
  videoFile: File;

  constructor() {
    this.currentImageIndex = 0;
    this.currentVideoIndex = 0;
  }

  ngOnInit(): void {
  }

  addMaterial() {
    this.stepTemplate.materials.push(this.materialToAdd);
    this.materialToAdd = undefined;
  }

  removeMaterial(index: number) {
    this.stepTemplate.materials.splice(index, 1);
  }

  selectTool() {
    //open tools selection dialog
  }

  addTool() {
    this.stepTemplate.toolIds.push(this.toolToAdd);
    this.toolToAdd = undefined;
  }

  removeTool(index: number) {
    this.stepTemplate.toolIds.splice(index, 1);
  }

  addImage(event) {
    this.imageFile = event.target.files[0];
  }

  removeImage(index: number) {
    this.stepTemplate.pictureUris.splice(index, 1);
  }

  changeImageIndex(index: number) {
    this.currentImageIndex = index;
  }

  addVideo(event) {
    this.videoFile = event.target.files[0];
  }

  removeVideo(index: number) {
    this.stepTemplate.videoUris.splice(index, 1);
  }

  changeVideoIndex(index: number) {
    this.currentVideoIndex = index;
  }
}
