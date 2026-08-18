import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AdminRoutingModule } from './admin-routing.module';
import { HomeAdminComponent } from './home-admin/home-admin.component';
import { CadastroAdminComponent } from './cadastro-admin/cadastro-admin.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ViewAdminComponent } from './view-admin/view-admin.component';


@NgModule({
  declarations: [
    HomeAdminComponent,
    CadastroAdminComponent,
    ViewAdminComponent
  ],
  imports: [
    CommonModule,
    AdminRoutingModule,
    FormsModule,
    ReactiveFormsModule,
  ]
})
export class AdminModule { }
