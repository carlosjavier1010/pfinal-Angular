import { Component, OnInit } from '@angular/core';
import { trigger,style,transition,animate, state } from '@angular/animations';
import { AuthService } from '../usuarios/auth.service';
import { Router } from '@angular/router';
import { UsuarioService } from '../usuarios/usuario.service';
import { Usuario } from '../usuarios/usuario';
@Component({
  selector: 'app-inicio',
  templateUrl: './inicio.component.html',
  styleUrls: ['./inicio.component.scss'],
  animations:[
    trigger('enterState',[
      state('void',style({
        transform: 'translateY(-100%)',
        opacity:0
      })),
      transition(':enter',[
        animate(3500,style({
          transform:'translateY(0)',
          opacity:1.5
        }))
      ])
    ])
  ]
})
export class InicioComponent implements OnInit {

  usuario: Usuario;
  topTres: Usuario[];

  constructor(public authService: AuthService, public route: Router, public usuarioService: UsuarioService) { }

  ngOnInit(): void {
    this.usuario = new Usuario();
    this.cargarPefil();
    this.cargarMasPelaos();
  }

  cargarPefil(): void {
    this.usuarioService.getUsuarioById(this.authService.usuario.id).subscribe((usuario) => {
      this.usuario = usuario as Usuario;

      //let usuarioo = JSON.stringify(this.usuario);

     });
  }


  cargarMasPelaos(): void {
    this.usuarioService.getUsuariosMasPelaos().subscribe((usuario) => {
    this.topTres = usuario as Usuario[];

      //let usuarioo = JSON.stringify(this.usuario);

     });
  }

}
