import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'tabIndices'
})
export class TabIndicesPipe implements PipeTransform {

  transform(fragment: string): number[] {
    if (!fragment?.length) {
      return [];
    }

    return fragment.split('.').map(value => parseInt(value));
  }

}
