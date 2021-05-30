import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'tabFragment'
})
export class TabFragmentPipe implements PipeTransform {

  transform(tabIndices: number[]): string {
    return tabIndices.join('.');
  }

}
