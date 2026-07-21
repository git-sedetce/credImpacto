import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './componentes/estrutura/home/home.component';
import { EmptyLayoutComponent } from './layouts/empty-layout/empty-layout.component';
import { MainLayoutComponent } from './layouts/main-layout/main-layout.component';
import { WhatIsComponent } from './componentes/credImpacto/what-is/what-is.component';

const routes: Routes = [
  //Layout sem Header/Footer
  {
    path: '',
    component: EmptyLayoutComponent,
    children: [
      {
        path: '',
        redirectTo: 'home',
        pathMatch: 'full'
      },
      { path: 'home', component: HomeComponent },
    ],
  },

  // Layout com Header/Footer
  {
    path: '',
    component: MainLayoutComponent,
    children: [{ path: 'what-is', component: WhatIsComponent }],
  },

  //Módulo Questionário
  {
    path: 'questionario',
    loadChildren: () =>
      import('./componentes/questionario/questionario.module').then(
        (quest) => quest.QuestionarioModule,
      ),
  },
  {
    path: '**',
    redirectTo: 'home',
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
