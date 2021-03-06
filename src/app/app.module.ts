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
import { FormsModule , ReactiveFormsModule} from '@angular/forms';
import { LoginComponent } from './usuarios/login.component';
import { UsuarioService } from './usuarios/usuario.service';
import { AuthService } from './usuarios/auth.service';
import { MatStepperModule  } from '@angular/material/stepper';
import { MatIconModule  } from '@angular/material/icon';
import { MatFormFieldModule  } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import {MatSelectModule} from '@angular/material/select';
import {MatTabsModule} from '@angular/material/tabs';
import { RegistroComponent } from './usuarios/registro/registro.component';
import { AdminComponent } from './usuarios/admin/admin.component';

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
    LoginComponent,
    RegistroComponent,
    AdminComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    AppRoutingModule,
    FormsModule,
    BrowserAnimationsModule,
    MatStepperModule,
    MatIconModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatSelectModule,
    MatTabsModule
  ],
  providers: [CitaService, UsuarioService, AuthService],
  bootstrap: [AppComponent]
})
export class AppModule { }
