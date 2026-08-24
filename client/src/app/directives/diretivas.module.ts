import { NgModule } from '@angular/core';
import { CepMascaraDirective } from './cep-mascara.directive';
import { CnpjMaskDirective } from './cnpj-mask.directive';
import { CnpjValidacaoDirective } from './cnpj-validacao.directive';
import { CpfcnpjMaskDirective } from './cpfcnpj-mask.directive';
import { TelefoneMascaraDirective } from './telefone-mascara.directive';
import { TelefoneValidacaoDirective } from './telefone-validacao.directive';
import { CpfMaskDirective } from './cpf-mask.directive';
import { CpfOrEmailValidatorDirective } from './cpf-or-email-validator.directive';

@NgModule({
  declarations: [
    CpfcnpjMaskDirective,
    TelefoneMascaraDirective,
    TelefoneValidacaoDirective,
    CepMascaraDirective,
    CpfMaskDirective,
    CnpjMaskDirective,
    CnpjValidacaoDirective,
  ],
  imports: [CpfOrEmailValidatorDirective],
  exports: [
    CpfcnpjMaskDirective,
    TelefoneMascaraDirective,
    TelefoneValidacaoDirective,
    CepMascaraDirective,
    CpfMaskDirective,
    CnpjMaskDirective,
    CnpjValidacaoDirective,
    CpfOrEmailValidatorDirective,
  ]
})
export class DiretivasModule {}
