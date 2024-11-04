import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'exponential',
  standalone: true,
})
export class ExponentialPipe implements PipeTransform {
  //... argomenti infiniti
  // transform(value: unknown, ...args: unknown[]): unknown {
  transform(value: number, exp: string): number {
    let e = parseFloat(exp);
    return Math.pow(value, isNaN(e) ? 1 : e);
  }
}
