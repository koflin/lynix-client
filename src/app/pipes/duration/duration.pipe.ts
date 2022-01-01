import { Pipe, PipeTransform } from '@angular/core';
import * as moment from 'moment';

@Pipe({
  name: 'duration'
})
export class DurationPipe implements PipeTransform {

  transform(seconds: number, format: DurationFormat = 'hour-second'): string {
    const duration = moment.duration(seconds, 'seconds');

    switch(format) {
      case 'hour-second':
        return Math.floor(duration.asHours()) + 'h ' + duration.minutes() + 'm ' + duration.seconds() + 's';
      default:
        return 'Format not supported';
    }
  }

}

export type DurationFormat = 'hour-second';
