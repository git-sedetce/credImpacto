import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { WhatIsComponent } from './what-is/what-is.component';
import { FluxoCapacitacaoComponent } from './fluxo-capacitacao/fluxo-capacitacao.component';
import { MonitoramentoComponent } from './monitoramento/monitoramento.component';
import { NegociosImpactoComponent } from './negocios-impacto/negocios-impacto.component';
import { FaqComponent } from './faq/faq.component';
import { FaleConoscoComponent } from './fale-conosco/fale-conosco.component';

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
  },
  {
    path: 'negocios',
    component: NegociosImpactoComponent
  },
  {
    path: 'faq',
    component: FaqComponent
  },
  {
    path: 'faleconosco',
    component: FaleConoscoComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CredImpactoRoutingModule { }
