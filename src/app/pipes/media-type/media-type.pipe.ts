import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'videoType'
})
export class VideoTypePipe implements PipeTransform {

  transform(url: string): string {
    url = url.toLowerCase();

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

}
