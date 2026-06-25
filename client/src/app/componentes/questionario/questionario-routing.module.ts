import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { ResponderQuestionarioComponent } from './responder-questionario/responder-questionario.component';
import { QuestionarioAdminComponent } from './questionario-admin/questionario-admin.component';

const routes: Routes = [
  { path: 'home', component: HomeComponent },
  { path: 'adminquest', component: QuestionarioAdminComponent },
  { path: 'respodequest', component: ResponderQuestionarioComponent }

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class QuestionarioRoutingModule { }
