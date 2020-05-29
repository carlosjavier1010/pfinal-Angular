import { Component, OnInit } from '@angular/core';
import { trigger,style,transition,animate, state } from '@angular/animations';
import { Perfil } from '../models/perfil';
import { DatePipe } from '@angular/common';
import { AuthService } from '../usuarios/auth.service';
import { Usuario } from '../usuarios/usuario';
import { UsuarioService } from '../usuarios/usuario.service';
import swal from 'sweetalert2';

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
  constructor(public authService: AuthService, private usuarioService: UsuarioService) {

   }

  ngOnInit(): void {
    console.log(this.authService.usuario.id);
   this.usuarioService.getUsuarioById(this.authService.usuario.id).subscribe(usuario => this.usuario = usuario);
   //this.fMovil = this.formatoMovil(this.usuario.movil);
  }

}
