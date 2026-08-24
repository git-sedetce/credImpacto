import { Directive, ElementRef, HostListener } from '@angular/core';

@Directive({
  selector: '[appCepMascara]',
  standalone: false
})
export class CepMascaraDirective {

  constructor(private el: ElementRef<HTMLInputElement>) { }

  @HostListener('input', ['$event'])
  onInput(event: Event): void {

    const input = this.el.nativeElement;

    // Remove tudo que não for número
    let value = input.value.replace(/\D/g, '');

    // Limita a 8 dígitos
    value = value.substring(0, 8);

    // Aplica a máscara
    if (value.length > 5) {
      value = value.replace(/^(\d{5})(\d{1,3})$/, '$1-$2');
    }

    input.value = value;

    // Atualiza o ngModel
    input.dispatchEvent(new Event('input', {
      bubbles: true,
      cancelable: true
    }));
  }

  @HostListener('keypress', ['$event'])
  onKeyPress(event: KeyboardEvent): void {

    // Permite apenas números
    if (!/[0-9]/.test(event.key)) {
      event.preventDefault();
    }
  }

}
