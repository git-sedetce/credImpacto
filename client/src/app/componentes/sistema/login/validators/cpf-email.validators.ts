import {
  AbstractControl,
  ValidationErrors,
  ValidatorFn
} from '@angular/forms';

export function cpfOrEmailValidator(): ValidatorFn {

  return (control: AbstractControl): ValidationErrors | null => {

    const value = control.value?.trim();

    // Deixa o required cuidar do campo vazio
    if (!value) {
      return null;
    }

    // Se possui @, valida como e-mail
    if (value.includes('@')) {

      const emailRegex =
        /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;

      return emailRegex.test(value)
        ? null
        : { invalidCpfOrEmail: true };
    }

    // Caso contrário, valida como CPF
    const cpf = value.replace(/\D/g, '');

    if (cpf.length !== 11) {
      return { invalidCpfOrEmail: true };
    }

    return validarCPF(cpf)
      ? null
      : { invalidCpfOrEmail: true };
  };
}


/**
 * Valida CPF
 */
function validarCPF(cpf: string): boolean {

  // Rejeita números repetidos:
  // 00000000000
  // 11111111111
  // etc.
  if (/^(\d)\1+$/.test(cpf)) {
    return false;
  }

  // Primeiro dígito verificador
  let soma = 0;

  for (let i = 0; i < 9; i++) {
    soma += Number(cpf.charAt(i)) * (10 - i);
  }

  let resto = (soma * 10) % 11;

  if (resto === 10) {
    resto = 0;
  }

  if (resto !== Number(cpf.charAt(9))) {
    return false;
  }

  // Segundo dígito verificador
  soma = 0;

  for (let i = 0; i < 10; i++) {
    soma += Number(cpf.charAt(i)) * (11 - i);
  }

  resto = (soma * 10) % 11;

  if (resto === 10) {
    resto = 0;
  }

  return resto === Number(cpf.charAt(10));
}
