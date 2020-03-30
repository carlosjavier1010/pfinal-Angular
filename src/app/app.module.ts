import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { CabeceraComponent } from './cabecera/cabecera.component';
import { InicioComponent } from './inicio/inicio.component';
import { FooterComponent } from './footer/footer.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { PerfilComponent } from './perfil/perfil.component';
import { DriveComponent } from './drive/drive.component';
import { BlogComponent } from './blog/blog.component';
import { MasPelaoComponent } from './mas-pelao/mas-pelao.component';
@NgModule({
  declarations: [
    AppComponent,
    CabeceraComponent,
    InicioComponent,
    FooterComponent,
    PerfilComponent,
    DriveComponent,
    BlogComponent,
    MasPelaoComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
