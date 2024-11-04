import { Directive, Input } from '@angular/core';
import {
  AbstractControl,
  NG_VALIDATORS,
  ValidationErrors,
  Validator,
} from '@angular/forms';

@Directive({
  selector: '[appForbiddenNames]',
  standalone: true,
  providers: [
    {
      provide: NG_VALIDATORS,
      useExisting: ForbiddenNamesDirective,
      multi: true,
    },
  ],
})
export class ForbiddenNamesDirective implements Validator {

  @Input('appForbiddenNames')
  name: string = 'Gianni';

  constructor() { }

  //#region Methods

  validate(control: AbstractControl): ValidationErrors | null {
    return validateForbiddenNames(this.name)(control);
  }



  registerOnValidatorChange?(fn: () => void): void {
  }
  //#endregion
}

export function validateForbiddenNames(name: string) {
  return (control: AbstractControl): ValidationErrors | null => {
    if (control.value === name) {
      return { appForbiddenNames: `${name} non è un nome valido` };
    }
    return null;
  }
}
