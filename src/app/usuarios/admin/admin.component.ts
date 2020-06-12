import { Component, OnInit } from '@angular/core';
import { UsuarioService } from '../usuario.service';
import { Router } from '@angular/router';
import { Usuario } from '../usuario';
import swal from 'sweetalert2';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.scss']
})
export class AdminComponent implements OnInit {

  usuariosGest: Usuario[];
  usuarioMod: Usuario;
  constructor(public router: Router,
    public usuarioService: UsuarioService) { }

  ngOnInit(): void {
    this.usuarioMod = new Usuario();
    this.cargarUsuarios();
  }


  cargarUsuarios(): void {
    this.usuarioService.getUsuarios().subscribe((usuario) => {

    this.usuariosGest = usuario as Usuario[];

      //let usuarioo = JSON.stringify(this.usuario);

     });
  }

  selectUsuarioMod(id: number): void {
    this.usuarioMod.id = id;
    this.usuarioService.getUsuarioById(id).subscribe((usuario) => {

      this.usuarioMod = usuario as Usuario;

       });
    console.log("usuario mod id:::" + this.usuarioMod.id);
  }

  modificarUsuario(): void {
      this.usuarioMod.roles = null;
      this.guardarUsuarioMod(this.usuarioMod);
      this.cargarUsuarios();
  }

  desactivarUsuario(id: number): void {
    this.usuarioMod.id = id;
    this.usuarioService.getUsuarioById(id).subscribe((usuario) => {

      this.usuarioMod = usuario as Usuario;
      this.usuarioMod.roles = null;
      this.usuarioMod.verified = false;
      this.guardarUsuarioMod(this.usuarioMod);

       });
       this.cargarUsuarios();
  }

  activarUsuario(id: number): void {
    this.usuarioMod.id = id;
    this.usuarioService.getUsuarioById(id).subscribe((usuario) => {

      this.usuarioMod = usuario as Usuario;
      this.usuarioMod.roles = null;
      this.usuarioMod.verified = true;
      this.guardarUsuarioMod(this.usuarioMod);

       });
      this.cargarUsuarios();
  }

  guardarUsuarioMod(usuario: Usuario): void {
    this.usuarioService.setUsuarioById(usuario as Usuario).subscribe(
      (usuario) => {

        swal.fire(
          'Usuario Actualizado correctamente ',
          `datos del usuario ${usuario.nombre} actualizados correctamente.`,
          'success'
        );

      });
      this.cargarUsuarios();
    }

  eliminarUsuario(id: number): void {

    this.usuarioService.DeleteUsuario(id).subscribe();
    this.cargarUsuarios();
    swal.fire(
      'Usuario Eliminado correctamente ',
      `La cuenta del usuario ${id} eliminado correctamente.`,
      'success'
    );

    this.cargarUsuarios();
  }
}
