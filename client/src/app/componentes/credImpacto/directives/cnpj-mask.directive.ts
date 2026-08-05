import { Directive, HostListener } from '@angular/core';

@Directive({
  selector: '[appCnpjMask]',
  standalone: false,
})
export class CnpjMaskDirective {
  @HostListener('input', ['$event'])
  onInputChange(event: Event): void {
    const input = event.target as HTMLInputElement;

    let valor = input.value;

    // Mantém apenas letras e números
    valor = valor.replace(/[^a-zA-Z0-9]/g, '');

    // Converte letras para maiúsculas
    valor = valor.toUpperCase();

    // Limita a 14 caracteres
    valor = valor.substring(0, 14);

    // Aplica a máscara
    valor = this.formatarCNPJ(valor);

    input.value = valor;
  }

  private formatarCNPJ(valor: string): string {
    if (valor.length <= 2) {
      return valor;
    }

    if (valor.length <= 5) {
      return valor.replace(/^([A-Z0-9]{2})([A-Z0-9]+)/, '$1.$2');
    }

    if (valor.length <= 8) {
      return valor.replace(
        /^([A-Z0-9]{2})([A-Z0-9]{3})([A-Z0-9]+)/,
        '$1.$2.$3',
      );
    }

    if (valor.length <= 12) {
      return valor.replace(
        /^([A-Z0-9]{2})([A-Z0-9]{3})([A-Z0-9]{3})([A-Z0-9]+)/,
        '$1.$2.$3/$4',
      );
    }

    return valor.replace(
      /^([A-Z0-9]{2})([A-Z0-9]{3})([A-Z0-9]{3})([A-Z0-9]{4})([A-Z0-9]{2}).*/,
      '$1.$2.$3/$4-$5',
    );
  }
}
