import { Component, OnInit } from '@angular/core';
import { Usuario } from './usuario';
import swal from 'sweetalert2';
import { AuthService } from './auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  titulo = 'Por favor Sign in';
  usuario: Usuario;
  constructor(private authService: AuthService, private router: Router) {
    this.usuario = new Usuario();
  }

  ngOnInit(): void {
    /* Si implemento el boton de login, para que si vuelve a querer logear el usuario estando ya logeado le informe
    if (this.authService.isAuthenticated()) {
      swal.fire('Login', `Hola ${this.authService.usuario.nombre} ya estás autenticado!`, 'info');
      this.router.navigate(['/inicio']);
    } */
  }

  login(): void {
    console.log(this.usuario);
    if (this.usuario.email == null || this.usuario.pass == null) {
      swal.fire('Error Login', 'Email o password vacías', 'error');
      return;
    }
    this.authService.login(this.usuario).subscribe(response => {
      console.log(response);

      this.authService.guardarUsuario(response.access_token);
      this.authService.guardarToken(response.access_token);
      let usuario = this.authService.usuario;
      /* window.history.back(); */ //regresar a la pagina anterior

      this.router.navigate(['/citas']);
      swal.fire('Login', `Hola ${usuario.nombre}, has iniciado sesión con éxito!`, 'success');
    }, err => {
      if (err.status = 400) {
        swal.fire('Error Login', 'Correo o contraseña proporcionada incorrectas', 'error');
      }
    }
    );
  }



}
