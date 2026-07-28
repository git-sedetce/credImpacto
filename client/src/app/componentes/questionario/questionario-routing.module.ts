import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ResponderQuestionarioComponent } from './responder-questionario/responder-questionario.component';
import { QuestionarioAdminComponent } from './questionario-admin/questionario-admin.component';
import { DiagnosticoComponent } from './diagnostico/diagnostico.component';

const routes: Routes = [
  { path: 'diagnostico', component: DiagnosticoComponent },
  { path: 'adminquest', component: QuestionarioAdminComponent },
  { path: 'respodequest', component: ResponderQuestionarioComponent }

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class QuestionarioRoutingModule { }
