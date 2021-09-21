import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'pluck'
})
export class PluckPipe implements PipeTransform {

  transform(array: any[], property: string): any {
    return array.map(item => item[property]);
  }

}
