import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  //Módulo Questionário

  { path: 'questionario', loadChildren: () => import('./componentes/questionario/questionario.module').then(quest => quest.QuestionarioModule) },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
