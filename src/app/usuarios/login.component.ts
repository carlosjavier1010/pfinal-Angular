import { Component, OnInit } from '@angular/core';
import { Usuario } from './usuario';
import swal from 'sweetalert2';
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  titulo: string = "Por favor Sign in";
  usuario : Usuario
  constructor() {
    this.usuario = new Usuario();
  }

  ngOnInit(): void {

  }

  login(): void{
    console.log(this.usuario);
    if(this.usuario.email == null || this.usuario.pass==null){
      swal.fire('Error Login', 'Email o password vacías', 'error');
      return;
    }
  }

}
