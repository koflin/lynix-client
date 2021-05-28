import { Pipe, PipeTransform } from '@angular/core';
import { OrderStatus } from 'src/app/models/order';
import { ProcessStatus } from 'src/app/models/process';

@Pipe({
  name: 'status'
})
export class StatusPipe implements PipeTransform {

  transform(value: OrderStatus | ProcessStatus, ...args: unknown[]): string {
    switch(value) {
      case 'in_preparation':
        return $localize `in preparation`;

      case 'released':
        return $localize `released`;

      case 'in_progress':
        return $localize `in progress`;

      case 'completed':
        return $localize `completed`;

      case 'assistance_required':
        return $localize `assistance required`;
    }
  }

}
