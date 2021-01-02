import { Injectable } from '@angular/core';
import * as moment from 'moment';

@Injectable({
  providedIn: 'root'
})
export class TimeService {

  constructor() { }
  getDurationHms(seconds: number) {
    const duration = moment.duration(seconds, 'seconds');
    return Math.floor(duration.asHours()) + 'h ' + duration.minutes() + 'm ' + duration.seconds() + 's';
  }

  getDurationHmString(seconds: number) {
    const duration = moment.duration(seconds, 'seconds');
    return Math.floor(duration.asHours()) + 'h ' + Math.ceil(duration.minutes()) + 'm ';
  }
}
