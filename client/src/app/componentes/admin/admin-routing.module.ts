import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeAdminComponent } from './home-admin/home-admin.component';
import { CadastroAdminComponent } from './cadastro-admin/cadastro-admin.component';
import { ViewAdminComponent } from './view-admin/view-admin.component';
import { CadastroPoloComponent } from './cadastro-polo/cadastro-polo.component';

const routes: Routes = [
  { path: 'admin', component: HomeAdminComponent },
  { path: 'cadastro', component: CadastroAdminComponent },
  { path: 'viewadmin', component: ViewAdminComponent },
  { path: 'cadastropolo', component: CadastroPoloComponent },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AdminRoutingModule { }
