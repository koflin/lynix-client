import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'permission'
})
export class PermissionPipe implements PipeTransform {

  transform(value: string, ...args: unknown[]): unknown {
    switch(value) {
      case 'view':
        return $localize `view`;

      case 'execute':
        return $localize `execute`;

      case 'edit':
        return $localize `edit`;

      case 'assign':
        return $localize `assign`;
    }
  }

}
