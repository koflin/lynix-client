import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'durationUnit'
})
export class DurationUnitPipe implements PipeTransform {

  transform(value: moment.unitOfTime.Base): string {
    switch(value) {
      case 'seconds':
        return $localize `seconds`;

      case 'minutes':
        return $localize `minutes`;

      case 'hours':
        return $localize `hours`;

      default:
        throw new Error('Duration unit "' + value + '" not implemented yet!');
    }
  }

}
