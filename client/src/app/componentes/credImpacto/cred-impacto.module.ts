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


@NgModule({
  declarations: [
    WhatIsComponent,
    FluxoCapacitacaoComponent,
    MonitoramentoComponent,
    NegociosImpactoComponent,
    FaqComponent,
    FaleConoscoComponent
  ],
  imports: [
    CommonModule,
    CredImpactoRoutingModule,
    FormsModule,
    ReactiveFormsModule
  ]
})
export class CredImpactoModule { }
