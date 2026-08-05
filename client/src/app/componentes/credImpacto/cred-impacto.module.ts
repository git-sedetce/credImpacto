import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CredImpactoRoutingModule } from './cred-impacto-routing.module';
import { FluxoCapacitacaoComponent } from './fluxo-capacitacao/fluxo-capacitacao.component';
import { WhatIsComponent } from './what-is/what-is.component';
import { MonitoramentoComponent } from './monitoramento/monitoramento.component';
import { NegociosImpactoComponent } from './negocios-impacto/negocios-impacto.component';
import { FaqComponent } from './faq/faq.component';
import { FaleConoscoComponent } from './fale-conosco/fale-conosco.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CadastroComponent } from './cadastro/cadastro.component';
import { LoginComponent } from './login/login.component';
import { CpfcnpjMaskDirective } from './directives/cpfcnpj-mask.directive';
import { TelefoneMascaraDirective } from './directives/telefone-mascara.directive';
import { TelefoneValidacaoDirective } from './directives/telefone-validacao.directive';
import { CepMascaraDirective } from './directives/cep-mascara.directive';
import { ToastrModule } from 'ngx-toastr';

@NgModule({
  declarations: [
    WhatIsComponent,
    FluxoCapacitacaoComponent,
    MonitoramentoComponent,
    NegociosImpactoComponent,
    FaqComponent,
    FaleConoscoComponent,
    CadastroComponent,
    LoginComponent,
    CpfcnpjMaskDirective,
    TelefoneMascaraDirective,
    TelefoneValidacaoDirective,
    CepMascaraDirective
  ],
  imports: [
    CommonModule,
    CredImpactoRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    ToastrModule.forRoot(),
  ]
})
export class CredImpactoModule { }
