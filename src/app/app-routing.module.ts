import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

// Importo los componentes
import { InicioComponent } from './inicio/inicio.component';
import { PerfilComponent } from './perfil/perfil.component';
import { DriveComponent } from './drive/drive.component';
import { BlogComponent } from './blog/blog.component';
import { MasPelaoComponent } from './mas-pelao/mas-pelao.component';
import { CitasComponent } from './citas/citas.component';

const routes: Routes = [
{path: '', component:InicioComponent}, // Componente predeterminado a cargar
{path: 'perfil', component:PerfilComponent},
{path: 'drive', component:DriveComponent},
{path: 'blog', component:BlogComponent},
{path: 'mas-pelao', component:MasPelaoComponent},
{path: 'citas', component:CitasComponent},
{path: '**', component:InicioComponent} // Componente por defecto en caso de error 404
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
