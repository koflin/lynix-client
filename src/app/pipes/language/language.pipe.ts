import { Pipe, PipeTransform } from '@angular/core';
import { Language } from 'src/app/shared/models/language';

@Pipe({
  name: 'language'
})
export class LanguagePipe implements PipeTransform {

  transform(value: Language, ...args: unknown[]): string {
    switch(value) {
      case Language.EN:
        return 'English';

      case Language.DE:
        return 'Deutsch';

      default:
        return value;
    }
  }

}
