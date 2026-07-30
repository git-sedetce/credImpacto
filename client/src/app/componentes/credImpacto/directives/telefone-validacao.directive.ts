import { Directive } from '@angular/core';
import {
  AbstractControl,
  NG_VALIDATORS,
  ValidationErrors,
  Validator,
} from '@angular/forms';

@Directive({
  selector: '[appTelefoneValidacao][ngModel]',
  providers: [
    {
      provide: NG_VALIDATORS,
      useExisting: TelefoneValidacaoDirective,
      multi: true,
    },
  ],
  standalone: false,
})
export class TelefoneValidacaoDirective implements Validator {
  validate(control: AbstractControl): ValidationErrors | null {
    const value = control.value;

    if (!value) {
      return null;
    }

    const telefone = value.replace(/\D/g, '');

    if (/^(\d)\1+$/.test(telefone)) {
      return {
        telefoneInvalido: true,
      };
    }

    if (telefone.length < 10 || telefone.length > 11) {
      return {
        telefoneInvalido: true,
      };
    }

    return null;
  }
}
