import { Directive } from '@angular/core';
import {
  AbstractControl,
  NG_VALIDATORS,
  ValidationErrors,
  Validator
} from '@angular/forms';

import { cpfOrEmailValidator } from '../validators/cpf-email.validators';

@Directive({
  selector: '[appCpfOrEmailValidator]',
  providers: [
    {
      provide: NG_VALIDATORS,
      useExisting: CpfOrEmailValidatorDirective,
      multi: true
    }
  ],
  standalone: true
})
export class CpfOrEmailValidatorDirective implements Validator {

  validate(control: AbstractControl): ValidationErrors | null {
    return cpfOrEmailValidator()(control);
  }

}
