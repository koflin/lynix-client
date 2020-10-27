import { Injectable } from '@angular/core';
import { read } from 'fs';

@Injectable({
  providedIn: 'root'
})
export class MediaService {

  constructor() { }

  imageToBase64(file: File) {
    const reader = new FileReader();
    reader.readAsDataURL(file);
  }
}
