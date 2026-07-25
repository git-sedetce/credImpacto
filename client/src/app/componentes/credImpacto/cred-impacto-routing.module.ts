import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { WhatIsComponent } from './what-is/what-is.component';
import { FluxoCapacitacaoComponent } from './fluxo-capacitacao/fluxo-capacitacao.component';
import { MonitoramentoComponent } from './monitoramento/monitoramento.component';

const routes: Routes = [
  {
    path: 'what-is',
    component: WhatIsComponent
  },

  {
    path: 'fluxo',
    component: FluxoCapacitacaoComponent
  },

  {
    path: 'monitoramento',
    component: MonitoramentoComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CredImpactoRoutingModule { }
