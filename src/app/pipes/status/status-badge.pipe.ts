import { Pipe, PipeTransform } from '@angular/core';
import { OrderStatus } from 'src/app/models/order';
import { ProcessStatus } from 'src/app/models/process';

@Pipe({
  name: 'statusBadge'
})
export class StatusBadgePipe implements PipeTransform {

  transform(value: OrderStatus | ProcessStatus, ...args: unknown[]): unknown {
    switch(value) {
      case 'in_preparation':
        return 'info';

      case 'released':
        return 'warning';

      case 'in_progress':
        return 'info';

      case 'completed':
        return 'success';

      case 'assistance_required':
        return 'danger';
    }
  }

}
