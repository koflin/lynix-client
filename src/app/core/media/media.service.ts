import { Injectable } from '@angular/core';
import { Media } from 'src/app/models/media';

import { ApiService } from '../api/api.service';

@Injectable({
  providedIn: 'root'
})
export class MediaService {

  constructor(
    private api: ApiService
  ) {
  }

  upload(file: File) {
    const formData = new FormData();
    formData.append('file', file);

    return this.api.post<Media>('media', formData);
  }
}
