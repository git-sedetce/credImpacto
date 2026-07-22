import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HeaderComponent } from './componentes/estrutura/header/header.component';
import { FooterComponent } from './componentes/estrutura/footer/footer.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HomeComponent } from './componentes/estrutura/home/home.component';
import { MainLayoutComponent } from './layouts/main-layout/main-layout.component';
import { EmptyLayoutComponent } from './layouts/empty-layout/empty-layout.component';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    FooterComponent,
    HomeComponent,
    MainLayoutComponent,
    EmptyLayoutComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
