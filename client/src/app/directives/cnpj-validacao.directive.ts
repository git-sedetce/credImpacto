import { Directive, forwardRef } from '@angular/core';
import {
  AbstractControl,
  NG_VALIDATORS,
  ValidationErrors,
  Validator
} from '@angular/forms';

@Directive({
  selector: '[appCnpjValidacao]',
  standalone: false,
  providers: [
    {
      provide: NG_VALIDATORS,
      useExisting: forwardRef(() => CnpjValidacaoDirective),
      multi: true
    }
  ]
})
export class CnpjValidacaoDirective implements Validator {

  validate(control: AbstractControl): ValidationErrors | null {

    const valor = control.value;

    if (!valor) {
      return null;
    }

    return CnpjValidacaoDirective.validar(valor)
      ? null
      : { cnpjInvalido: true };
  }

  // ------------------------------------------------------------------
  // Daqui para baixo permanece exatamente o código que você já possui.
  // ------------------------------------------------------------------

  static limpar(cnpj: string): string {
    return cnpj.replace(/[^A-Za-z0-9]/g, '').toUpperCase();
  }

  private static valorCaracter(caractere: string): number {
    const codigo = caractere.charCodeAt(0);

    if (codigo >= 48 && codigo <= 57) {
      return codigo - 48;
    }

    if (codigo >= 65 && codigo <= 90) {
      return codigo - 48;
    }

    throw new Error(`Caractere inválido: ${caractere}`);
  }

  private static calcularDV(texto: string, pesos: number[]): number {

    let soma = 0;

    for (let i = 0; i < texto.length; i++) {
      soma += this.valorCaracter(texto[i]) * pesos[i];
    }

    const resto = soma % 11;

    return resto < 2 ? 0 : 11 - resto;
  }

  static validar(cnpj: string): boolean {

    const valor = this.limpar(cnpj);

    if (valor.length !== 14) {
      return false;
    }

    const base = valor.substring(0, 12);

    const dvInformado1 = Number(valor[12]);
    const dvInformado2 = Number(valor[13]);

    const dv1 = this.calcularDV(
      base,
      [5,4,3,2,9,8,7,6,5,4,3,2]
    );

    const dv2 = this.calcularDV(
      base + dv1,
      [6,5,4,3,2,9,8,7,6,5,4,3,2]
    );

    return dvInformado1 === dv1 &&
           dvInformado2 === dv2;
  }
}
