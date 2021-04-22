import { Pipe, PipeTransform } from '@angular/core';

import { OrderStatus } from '../models/order';

@Pipe({
  name: 'status'
})
export class StatusPipe implements PipeTransform {

  transform(value: OrderStatus, ...args: unknown[]): string {
    switch(value) {
      case 'in_preparation':
        return $localize `in preparation`;

      case 'released':
        return $localize `released`;

      case 'in_progress':
        return $localize `in progress`;

      case 'completed':
        return $localize `completed`;
    }
  }

}
