import { Component, OnInit } from '@angular/core';
import { UsuarioService } from '../usuario.service';
import { Router } from '@angular/router';
import { Usuario } from '../usuario';
import swal from 'sweetalert2';
@Component({
  selector: 'app-registro',
  templateUrl: './registro.component.html',
  styleUrls: ['../login.component.scss']
})
export class RegistroComponent implements OnInit {

  usuario: Usuario;

  constructor(private usuarioService: UsuarioService, private router: Router) { }

  ngOnInit(): void {
    this.usuario = new Usuario();
  }

  registro(): void{
    this.usuarioService.CreateUsuario(this.usuario as Usuario).subscribe(
      response => {
        swal.fire('Welcome !',`El usuario ${response.nombre} ha sido dado de alta correctamente. Puedes iniciar sesión.`, 'success');
        this.router.navigate(['/login']);
      }
    );
  }

}
