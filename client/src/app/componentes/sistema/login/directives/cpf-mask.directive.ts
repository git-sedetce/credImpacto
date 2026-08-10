import { Directive, ElementRef, HostListener } from '@angular/core';

@Directive({
  selector: '[appCpfMask]',
  standalone: true
})
export class CpfMaskDirective {

  constructor(private el: ElementRef<HTMLInputElement>) {}

  @HostListener('input', ['$event'])
  onInput(event: Event): void {

    const input = event.target as HTMLInputElement;
    const value = input.value;

    /*
     * Se o usuário começou a digitar um e-mail,
     * não aplica máscara de CPF.
     *
     * Exemplos:
     * joao
     * joao@
     * joao@email.com
     * joao.silva@email.com
     */
    if (/[a-zA-Z@]/.test(value)) {
      return;
    }

    /*
     * Caso contrário, considera que o usuário
     * está digitando um CPF.
     */
    const onlyNumbers = value.replace(/\D/g, '');

    /*
     * Limita o CPF a 11 números.
     */
    const cpf = onlyNumbers.slice(0, 11);

    /*
     * Aplica a máscara.
     */
    input.value = this.formatCPF(cpf);
  }

  private formatCPF(cpf: string): string {

    if (!cpf) {
      return '';
    }

    if (cpf.length <= 3) {
      return cpf;
    }

    if (cpf.length <= 6) {
      return cpf.replace(
        /(\d{3})(\d+)/,
        '$1.$2'
      );
    }

    if (cpf.length <= 9) {
      return cpf.replace(
        /(\d{3})(\d{3})(\d+)/,
        '$1.$2.$3'
      );
    }

    return cpf.replace(
      /(\d{3})(\d{3})(\d{3})(\d{2})/,
      '$1.$2.$3-$4'
    );
  }

  @HostListener('blur')
  onBlur(): void {

    const input = this.el.nativeElement;

    input.dispatchEvent(
      new Event('change', {
        bubbles: true
      })
    );
  }
}
