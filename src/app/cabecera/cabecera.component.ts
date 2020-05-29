import { Component, OnInit } from '@angular/core';
import * as $ from 'jquery';
import { AuthService } from '../usuarios/auth.service';
import { Router } from '@angular/router';
import swal from 'sweetalert2';

@Component({
  selector: 'app-cabecera',
  templateUrl: './cabecera.component.html',
  styleUrls: ['./cabecera.component.scss']
})
export class CabeceraComponent implements OnInit {

  constructor(public authService: AuthService , private router: Router) { }

  logout(): void{
    swal.fire('logout',`Hola ${this.authService.usuario.nombre} has cerrado sesión con éxito`, 'success');
    this.authService.logout();
    this.router.navigate(['/login']);
  }

  public function;
  ngOnInit(): void {
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
