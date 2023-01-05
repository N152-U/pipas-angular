import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'commaFormat'
})
export class CommaFormatPipe implements PipeTransform {

  transform(value: unknown, ...args: unknown[]): unknown {
    return null;
  }

}
