import { Directive } from '@angular/core';
import {
  AbstractControl,
  NG_VALIDATORS,
  ValidationErrors,
  Validator
} from '@angular/forms';

@Directive({
  selector: '[appEmailValidator]',
  standalone: true,
  providers: [
    {
      provide: NG_VALIDATORS,
      useExisting: EmailValidatorDirective,
      multi: true,
    },
  ],
})
export class EmailValidatorDirective implements Validator {

  constructor() {}

  //#region Methods
  validate(control: AbstractControl): ValidationErrors | null {
    if (control.value !== '') {
      const emailPattern: RegExp = /^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$/;
      if (!emailPattern.test(control.value)) {
        return { appEmailValidator: 'Formato email non valido' };
      }
    }
    return null;
  }

  static validate(control: AbstractControl): ValidationErrors | null {
    if (control.value !== '') {
      const emailPattern: RegExp = /^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$/;
      if (!emailPattern.test(control.value)) {
        return { appEmailValidator: 'Formato email non valido' };
      }
    }
    return null;
  }

  registerOnValidatorChange?(fn: () => void): void {}
  //#endregion
}
