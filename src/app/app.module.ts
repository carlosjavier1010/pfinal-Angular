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
import { CitasComponent } from './citas/citas.component';
import { CitaService } from './citas/cita.service';
import { HttpClientModule } from '@angular/common/http';
import { registerLocaleData } from '@angular/common';
import localeES from '@angular/common/locales/es';
import { FormComponent } from './citas/form.component';
import { FormsModule } from '@angular/forms';
import { LoginComponent } from './usuarios/login.component';
import { UsuarioService } from './usuarios/usuario.service';

registerLocaleData(localeES, 'es');

@NgModule({
  declarations: [
    AppComponent,
    CabeceraComponent,
    InicioComponent,
    FooterComponent,
    PerfilComponent,
    DriveComponent,
    BlogComponent,
    MasPelaoComponent,
    CitasComponent,
    FormComponent,
    LoginComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    AppRoutingModule,
    FormsModule,
    BrowserAnimationsModule
  ],
  providers: [CitaService,UsuarioService],
  bootstrap: [AppComponent]
})
export class AppModule { }
