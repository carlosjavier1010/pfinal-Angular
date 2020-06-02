import { Component, OnInit } from '@angular/core';
import { trigger,style,transition,animate, state } from '@angular/animations';
import { Perfil } from '../models/perfil';
import { DatePipe } from '@angular/common';
import { AuthService } from '../usuarios/auth.service';
import { Usuario } from '../usuarios/usuario';
import { UsuarioService } from '../usuarios/usuario.service';
import swal from 'sweetalert2';
import { Router } from '@angular/router';

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
  constructor(public authService: AuthService, private usuarioService: UsuarioService,
    private router: Router) {

   }

  ngOnInit(): void {
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
      this.formUsuario = false;
      this.cargarPefil();
  }

  formGuardar() :void {
    this.formUsuario = false;
    this.guardarPerfil();
}

  cargarPefil() :void {
    this.usuarioService.getUsuarioById(this.authService.usuario.id).subscribe((usuario) => {
      this.usuario = usuario;
     });
  }
  guardarPerfil() :void {
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
}
