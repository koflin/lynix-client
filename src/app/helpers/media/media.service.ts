import { Injectable } from '@angular/core';
import { read } from 'fs';

@Injectable({
  providedIn: 'root'
})
export class MediaService {

  constructor() { }

  imageToBase64(file: File) {
    return new Promise<string>((resolve, reject) => {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => resolve(reader.result as string);
      reader.onerror = error => reject(error);
    });
  }
}
