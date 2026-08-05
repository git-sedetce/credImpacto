import { Directive, ElementRef, HostListener, Input } from '@angular/core';

@Directive({
  selector: '[appCpfMask]',
  standalone: false,
})
export class CpfMaskDirective {
  @HostListener('input', ['$event'])
  onInputChange(event: Event): void {
    const input = event.target as HTMLInputElement;

    let valor = input.value;

    // Mantém apenas números
    valor = valor.replace(/\D/g, '');

    // Limita a 11 dígitos
    valor = valor.substring(0, 11);

    // Aplica a máscara
    valor = this.formatarCPF(valor);

    input.value = valor;
  }

  private formatarCPF(valor: string): string {
    if (valor.length <= 3) {
      return valor;
    }

    if (valor.length <= 6) {
      return valor.replace(/^(\d{3})(\d+)/, '$1.$2');
    }

    if (valor.length <= 9) {
      return valor.replace(/^(\d{3})(\d{3})(\d+)/, '$1.$2.$3');
    }

    return valor.replace(/^(\d{3})(\d{3})(\d{3})(\d{2}).*/, '$1.$2.$3-$4');
  }
}
