import { Pipe, PipeTransform } from '@angular/core';
import { Permission } from 'src/app/models/role';

@Pipe({
  name: 'permission'
})
export class PermissionPipe implements PipeTransform {

  transform(value: Permission, ...args: unknown[]): unknown {
    switch(value) {
      case Permission.ORDER_VIEW:
        return $localize `view orders`;

      case Permission.ORDER_EDIT:
        return $localize `edit orders`;

      case Permission.PROCESS_VIEW:
        return $localize `view processes`;

      case Permission.PROCESS_EXECUTE:
        return $localize `execute processes`;

      case Permission.PROCESS_ASSIGN:
        return $localize `assign processes`;

      case Permission.MANUAL_VIEW:
        return $localize `view manuals`;

      case Permission.TEMPLATE_VIEW:
        return $localize `view templates`;

      case Permission.TEMPLATE_EDIT:
        return $localize `edit templates`;

      case Permission.USER_VIEW:
        return $localize `view users`;

      case Permission.USER_EDIT:
        return $localize `edit users`;

      case Permission.ROLE_VIEW:
        return $localize `view roles`;

      case Permission.ROLE_EDIT:
        return $localize `edit roles`;

      case Permission.STATISTIC_VIEW:
        return $localize `view statistics`;

      case Permission.TOOL_EDIT:
        return $localize `edit tools`;

      case Permission.TESTING_VIEW:
        return $localize `view testing`;
    }
  }

}
