import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { CarouselConfig } from 'ngx-bootstrap/carousel';
import { MediaService } from 'src/app/core/media/media.service';
import { StepTemplate } from 'src/app/models/stepTemplate';

import { InputOutputValue } from '../models/InputOutputValue';

@Component({
  selector: 'app-step',
  templateUrl: './step.component.html',
  styleUrls: ['./step.component.scss'],
  providers: [
    { provide: CarouselConfig, useValue: { noPause: false, showIndicators: true } }
  ]
})
export class StepComponent implements OnInit {

  @Input () stepTemplate: StepTemplate
  @Output() stepTemplateChange = new EventEmitter<StepTemplate>();

  @Input() checkForError: boolean = false
  name = new InputOutputValue("name", "Step name", false)
  keyMessage = new InputOutputValue("keymessage", "Key Message", false)
  tasks = new InputOutputValue("tasks", "Tasks", false)



  materialToAdd: string;
  toolToAdd: string;
  imageFile: File;
  videoFile: File;
  estimatedTime: { hours: number, minutes: number };

  currentImageIndex: number;
  currentVideoIndex: number;

  constructor(private mediaService: MediaService) { }

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

    this.mediaService.upload(this.imageFile).subscribe((media) => {
      this.stepTemplate.pictureUris.push(media.url);
    });
  }

  removeImage(index: number) {
    this.stepTemplate.pictureUris.splice(index, 1);
  }

  addVideo(event) {
    this.videoFile = event.target.files[0];

    this.mediaService.upload(this.videoFile).subscribe((media) => {
      this.stepTemplate.videoUris.push(media.url);
    });
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

  getType(url: string) {
    if (url.endsWith('.mp4')) {
      return 'video/mp4';
    }

    if (url.endsWith('.ogg')) {
      return 'video/ogg'
    }

    if (url.endsWith('.webm')) {
      return 'video/webm'
    }

    return null;
  }

  private changeEstimatedTime() {
    this.stepTemplate.estimatedTime = this.estimatedTime.hours * 3600 + this.estimatedTime.minutes * 60;
    //this.estimatedTimeChange.emit(this.stepTemplate.estimatedTime);
    this.stepTemplateChange.emit(this.stepTemplate)
  }

}
