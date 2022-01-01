import { Pipe, PipeTransform } from '@angular/core';
import { UserStatus } from 'src/app/models/user';

@Pipe({
  name: 'userStatus'
})
export class UserStatusPipe implements PipeTransform {

  transform(value: UserStatus, ...args: unknown[]): string {
    switch(value) {
      case UserStatus.ONLINE:
        return $localize `Online`;

      case UserStatus.OFFLINE:
        return $localize `Offline`;

      default:
        return $localize `Error: Unknown status`;
    }
  }

}
