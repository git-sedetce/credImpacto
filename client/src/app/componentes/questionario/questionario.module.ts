import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { QuestionarioRoutingModule } from './questionario-routing.module';
import { HomeComponent } from './home/home.component';
import { QuestionarioAdminComponent } from './questionario-admin/questionario-admin.component';
import { ResponderQuestionarioComponent } from './responder-questionario/responder-questionario.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { DiagnosticoComponent } from './diagnostico/diagnostico.component';


@NgModule({
  declarations: [
    HomeComponent,
    QuestionarioAdminComponent,
    ResponderQuestionarioComponent,
    DiagnosticoComponent
  ],
  imports: [
    CommonModule,
    QuestionarioRoutingModule,
    FormsModule,
    ReactiveFormsModule
  ]
})
export class QuestionarioModule { }
