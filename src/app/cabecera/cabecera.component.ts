import { Component, OnInit } from '@angular/core';
import * as $ from 'jquery';
import { AuthService } from '../usuarios/auth.service';
import { Router } from '@angular/router';
import swal from 'sweetalert2';
import { UsuarioService } from '../usuarios/usuario.service';
import { Usuario } from '../usuarios/usuario';
import { HttpClient } from '@angular/common/http';
import { Role } from '../models/role';

@Component({
  selector: 'app-cabecera',
  templateUrl: './cabecera.component.html',
  styleUrls: ['./cabecera.component.scss']
})
export class CabeceraComponent implements OnInit {

  roleUsuarioConectado: Role;

  constructor(public authService: AuthService , public router: Router,
              public usuarioService: UsuarioService, public http: HttpClient) {


  }

  logout(): void{
    swal.fire('logout',`Hola ${this.authService.usuario.nombre} has cerrado sesión con éxito`, 'success');
    this.authService.logout();
    this.router.navigate(['/login']);
  }


  ngOnInit(): void {

    console.log('usuario conectado::::: cabecera component :::: ' + this.authService.usuario.roles);
    this.roleUsuarioConectado = this.authService.usuario.roles;
    $(function() {

      // tslint:disable-next-line: deprecation
      $('.ir-arriba').click(() => {
        $('body, html').animate({
          scrollTop: '0px'
        }, 300);
      });

      // tslint:disable-next-line: deprecation
      $(window).scroll(() => {
        if ( $(this).scrollTop() > 0 ) {
          $('.ir-arriba').slideDown(300);
        } else {
          $('.ir-arriba').slideUp(300);
        }
      });

    });


  }



close() {

    $('.navbar-toggler').click();
  }



}
