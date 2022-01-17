import { Pipe, PipeTransform } from '@angular/core';
import { OrderStatus } from 'src/app/models/order';
import { ProcessStatus } from 'src/app/models/process';

@Pipe({
  name: 'status'
})
export class StatusPipe implements PipeTransform {

  transform(value: OrderStatus | ProcessStatus, ...args: unknown[]): string {
    switch(value) {
      case OrderStatus.IN_PREPARATION:
      case ProcessStatus.IN_PREPARATION:
        return $localize `in preparation`;

      case OrderStatus.RELEASED:
      case ProcessStatus.RELEASED:
        return $localize `released`;

      case OrderStatus.IN_PROGRESS:
      case ProcessStatus.IN_PROGRESS:
        return $localize `in progress`;

      case OrderStatus.COMPLETED:
      case ProcessStatus.COMPLETED:
        return $localize `completed`;

      case ProcessStatus.ASSISTANCE_REQUIRED:
        return $localize `assistance required`;
    }
  }

}
