import { Directive, ElementRef, HostListener } from '@angular/core';

@Directive({
  selector: '[appTelefoneMascara]',
  standalone: false,
})
export class TelefoneMascaraDirective {
  private atualizando = false;

  constructor(private el: ElementRef<HTMLInputElement>) {}

  @HostListener('input', ['$event'])
  onInput(event: Event): void {
    if (this.atualizando) {
      return;
    }

    const input = event.target as HTMLInputElement;
    let valor = input.value.replace(/\D/g, '');

    // aceita somente 11 números
    valor = valor.substring(0, 11);
    const formatado = this.formatar(valor);

    if (input.value !== formatado) {
      this.atualizando = true;
      input.value = formatado;
      input.dispatchEvent(new Event('input', { bubbles: true }));
      this.atualizando = false;
    }
  }

  private formatar(valor: string): string {
    if (valor.length <= 2) {
      return valor.length ? `(${valor}` : '';
    }

    if (valor.length <= 3) {
      return `(${valor.substring(0, 2)}) ${valor.substring(2)}`;
    }

    if (valor.length <= 7) {
      return `(${valor.substring(0, 2)}) ${valor.substring(2, 3)} ${valor.substring(3)}`;
    }

    return `(${valor.substring(0, 2)}) ${valor.substring(2, 3)} ${valor.substring(3, 7)} ${valor.substring(7)}`;
  }
}
