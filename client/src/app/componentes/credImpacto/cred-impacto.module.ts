import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CredImpactoRoutingModule } from './cred-impacto-routing.module';
import { FluxoCapacitacaoComponent } from './fluxo-capacitacao/fluxo-capacitacao.component';
import { WhatIsComponent } from './what-is/what-is.component';
import { MonitoramentoComponent } from './monitoramento/monitoramento.component';


@NgModule({
  declarations: [
    WhatIsComponent,
    FluxoCapacitacaoComponent,
    MonitoramentoComponent
  ],
  imports: [
    CommonModule,
    CredImpactoRoutingModule
  ]
})
export class CredImpactoModule { }
