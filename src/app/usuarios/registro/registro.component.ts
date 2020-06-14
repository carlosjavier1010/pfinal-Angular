import { Component, OnInit } from '@angular/core';
import { UsuarioService } from '../usuario.service';
import { Router } from '@angular/router';
import { Usuario } from '../usuario';
import swal from 'sweetalert2';
import { FormsModule } from '@angular/forms';
import {
  FormGroup,
  FormControl,
  Validators,
  ValidationErrors,
} from '@angular/forms';
@Component({
  selector: 'app-registro',
  templateUrl: './registro.component.html',
  styleUrls: ['../login.component.scss']
})
export class RegistroComponent implements OnInit {

  usuario: Usuario;
  formGroup: FormGroup;
  constructor(private usuarioService: UsuarioService, private router: Router) {
    this.formGroup = new FormGroup({
      email: new FormControl({ value: '' }, [Validators.required,Validators.pattern("^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$")]),
      movil: new FormControl({ value: '' }, [Validators.required,Validators.pattern("^[6 | 7 | 9]{1}[0-9]{8}$")])
    });
  }

  ngOnInit(): void {
    this.usuario = new Usuario();
    this.usuario.nombre = '';
  }

  registro(): void{



    console.log('la pass enviada registro:::' + this.usuario.pass);
    console.log('el nombre enviado registro:::' + this.usuario.nombre);
    this.usuarioService.CreateUsuario(this.usuario as Usuario).subscribe(
      (response) => {

        swal.fire('Welcome !',`El usuario ${this.usuario.nombre} ha sido dado de alta correctamente. Puedes iniciar sesión.`, 'success');
        this.router.navigate(['/login']);

      }
    );
  }

}
