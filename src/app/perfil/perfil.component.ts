import { Component, OnInit } from '@angular/core';
import { trigger,style,transition,animate, state } from '@angular/animations';
import { Perfil } from '../models/perfil';
import { DatePipe } from '@angular/common';
import { AuthService } from '../usuarios/auth.service';
import { Usuario } from '../usuarios/usuario';
import { UsuarioService } from '../usuarios/usuario.service';
import swal from 'sweetalert2';
import { Router } from '@angular/router';
import { HttpClient, HttpEventType } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { map , catchError } from 'rxjs/operators';

@Component({
  selector: 'app-perfil',
  templateUrl: './perfil.component.html',
  styleUrls: ['./perfil.component.scss'],
  animations:[
    trigger('enterState',[
      state('void',style({
        transform: 'translateY(-100%)',
        opacity:0
      })),
      transition(':enter',[
        animate(1500,style({
          transform:'translateY(0)',
          opacity:1.5
        }))
      ])
    ])
  ]
})
export class PerfilComponent implements OnInit {

  usuario: Usuario;
  fMovil: string;
  formUsuario: boolean;
  fotoSeleccionada: File;
  progreso: number = 0;
  interval: any;
  constructor(public authService: AuthService, public usuarioService: UsuarioService,
              public router: Router, public http: HttpClient) {

   }

  ngOnInit(): void {
    this.fotoSeleccionada = null;
    this.usuario = new Usuario();
    this.formUsuario = false;
    console.log(this.authService.usuario.id);
    this.cargarPefil();

   //this.fMovil = this.formatoMovil(this.usuario.movil);
  }

  formValidate() :void {
    if (this.formUsuario) {
      this.formUsuario = false;
    } else {
      this.formUsuario = true;
    }
  }
  formVolver() :void {
      clearInterval(this.interval);
      this.formUsuario = false;
      this.cargarPefil();
  }

  formGuardar() : void {
    this.formUsuario = false;
    this.guardarPerfil();
}

  cargarPefil(): void {
    this.usuarioService.getUsuarioById(this.authService.usuario.id).subscribe((usuario) => {
      this.usuario = usuario as Usuario;

      //let usuarioo = JSON.stringify(this.usuario);

     });
  }
  guardarPerfil(): void {
    this.usuario.roles = null;
    this.usuarioService.setUsuarioById(this.usuario as Usuario).subscribe(
      (usuario) => {
        this.authService.logout();
        swal.fire(
          'Por favor, vuelva a iniciar sesion ',
          `datos del usuario ${usuario.nombre} actualizados correctamente.`,
          'success'
        );
     });
  }



  seleccionarFoto(event: any){
    this.fotoSeleccionada = event.target.files[0];
    // Reseteamos el progreso para la proxima subida de foto
    this.progreso = 0;
    console.log(this.fotoSeleccionada);

    if (this.fotoSeleccionada.type.indexOf('image') < 0) {
      swal.fire(`Error al seleccionar la imagen.`,`El tipo de archivo debe de ser del tipo de imagen`,'error');
      this.fotoSeleccionada = null;
    } else {
      swal.fire(`No olvides de darle al boton subir.`,`Haz click en subir foto`,'info');
    }


  }

  subirFoto(){

    if (!this.fotoSeleccionada) {
      swal.fire(`Error al subir foto`, `Debes seleccionar una foto`,'error');
    } else {
      this.usuarioService.subirFoto(this.fotoSeleccionada, this.authService.usuario.id)
    .subscribe(event => {

      if (event.type === HttpEventType.UploadProgress) {
        this.progreso = Math.round((event.loaded / event.total) * 100);
      }else if(event.type === HttpEventType.Response) {
        let response: any = event.body;
        this.usuario = response.usuario as Usuario;
        swal.fire(`La foto se ha subido correctamente`, `Foto subida con éxito: ${response.mensaje}`,'success');

       this.interval = setInterval(() => {
          this.progreso = 0;
          this.formVolver();

          }, 3500);
      }

    });

    }
  }


}
