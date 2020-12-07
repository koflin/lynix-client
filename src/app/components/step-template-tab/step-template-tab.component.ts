import { MediaService } from './../../helpers/media/media.service';
import { StepTemplate } from './../../models/stepTemplate';
import { Component, Input, OnInit, Output, EventEmitter } from '@angular/core';
import { warn } from 'console';

@Component({
  selector: 'app-step-template-tab',
  templateUrl: './step-template-tab.component.html',
  styleUrls: ['./step-template-tab.component.scss']
})
export class StepTemplateTabComponent implements OnInit {

  @Input() stepTemplate: StepTemplate;
  @Output() stepTemplateChange = new EventEmitter<StepTemplate>();
  @Output() estimatedTimeChange = new EventEmitter<number>();

  materialToAdd: string;
  toolToAdd: string;

  currentImageIndex: number;
  currentVideoIndex: number;

  imageFile: File;
  videoFile: File;

  estimatedTime: { hours: number, minutes: number };

  constructor(private mediaService: MediaService) {
    this.currentImageIndex = 0;
    this.currentVideoIndex = 0;
  }

  ngOnInit(): void {
    this.estimatedTime = {
      hours: this.getHours(this.stepTemplate.estimatedTime),
      minutes: this.getMinutes(this.stepTemplate.estimatedTime)
    };
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

    this.mediaService.imageToBase64(this.imageFile).then((url: string) => {
      this.stepTemplate.pictureUris.push(url);
    }).catch((error) => {
      alert('Could not upload image, try a different file!');
    });
  }

  removeImage(index: number) {
    this.stepTemplate.pictureUris.splice(index, 1);
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

  changeEstimatedHours(hours: number) {
    hours = hours ? hours : 0;

    this.estimatedTime.hours = hours;
    this.changeEstimatedTime();
  }

  changeEstimatedMinutes(minutes: number) {
    minutes = minutes ? minutes : 0;

    this.estimatedTime.minutes = minutes;
    this.changeEstimatedTime();
  }

  getHours(seconds: number) {
    return Math.floor(seconds / 3600);
  }

  getMinutes(seconds: number) {
    return Math.ceil((seconds - this.getHours(seconds) * 3600) / 60);
  }

  private changeEstimatedTime() {
    this.stepTemplate.estimatedTime = this.estimatedTime.hours * 3600 + this.estimatedTime.minutes * 60;
    this.estimatedTimeChange.emit(this.stepTemplate.estimatedTime);
  }
}
