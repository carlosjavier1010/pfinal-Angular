import { Component, OnInit, Output } from '@angular/core';
import { Cita } from './cita';
import { CitaService } from './cita.service';
import { Router } from '@angular/router';
import swal from 'sweetalert2';
import { Usuario } from '../usuarios/usuario';
import { UsuarioService } from '../usuarios/usuario.service';
import { Observable, concat } from 'rxjs';
import { AuthService } from '../usuarios/auth.service';

@Component({
  selector: 'app-form',
  templateUrl: './form.component.html',
  styleUrls: ['./form.component.scss']
})
export class FormComponent implements OnInit {
  citas: Cita [] = [];
  citaForm: Cita = new Cita();
  titulo: string = "Seleccione su cita";
  errores: string[];
  usuarioEnSesion: Usuario;
  idUsuario: number;
  usuarios: Usuario[] = [];
  fechaSeleccionada: string;
  horaSeleccionada: string;
  horas: String[] = [];
  horasVerano: String[] = ['09:00','09:30','10:00','10:30','11:00','11:30','12:00','12:30','13:00','13:30','18:00','18:30'
,'19:00','19:30','20:00','20:30'];
  horasNoDisponibles: String[];

  constructor(public citaService: CitaService,
    public router: Router, public usuarioService: UsuarioService, public authService: AuthService)
    {

      this.citaForm = new Cita();
      this.citaForm.user = new Usuario;
      this.citaForm.user.id = 0;
      this.usuarioEnSesion = JSON.parse(sessionStorage.getItem('usuario')) as Usuario;
    console.log('este es el email: '+ this.usuarioEnSesion.email);





    }

  ngOnInit(): void {


    this.citaForm.estado = 0;
    this.horaSeleccionada = '';

    let usuarioAutenticado = this.authService.usuario;
    console.log('usuario autenticado :::: ',usuarioAutenticado);
    this.citaForm.user.id = usuarioAutenticado.id;
    console.log("el id del usuario conectado es: "+ this.citaForm.user.id);

    //this.citas.user = new Usuario();

    /* this.citas.user.id =  */


  }

    create(): void{
    if (this.horaSeleccionada != '') {
      console.log(this.citaForm);
    this.citaForm.fecha.replace('undefined','');
    console.log("cita mandada"+this.citaForm);
    this.citaService.create(this.citaForm as Cita)
      .subscribe(
        cita => {
          this.router.navigate(['/citas']);
          swal.fire('Nueva cita ', `con fecha ${cita.fecha} ha sido creada con éxito`, 'success');
        },
        err => {
          this.errores = err.error.errors as string[];
          console.error('Código del error desde el backend: ' + err.status);
          swal.fire('Fecha no seleccionada', `debes seleccionar una fecha`,'info');
          console.error(err.error.errors);
        }
      );
    }else if(this.fechaSeleccionada == '' || this.fechaSeleccionada == 'undefined'){
      swal.fire('Fecha no seleccionada', `debes seleccionar una fecha`,'info');
    }
    else {
      swal.fire('Hora no seleccionada', `debes seleccionar una hora`,'info');
    }
  }
  // Se ejecuta cada vez que cambiemos la fecha para comprobar las horas disponibles que puede seleccionar el usuario
  // Se comprueba que las horas de citas existentes en el servidor correspondientes a la fecha seleccionada no pueda
  // seleccionar el usuario esa hora, de esta forma, el usuario siempre coge entre horas disponibles
  selectFecha(e: string): void {
    this.horas = [];
    this.horas = [... this.horasVerano]; //clonar array para que vuelva a tener todas las horas, si no la hora que quitemos
    // nos saldrá quitada en la proxima seleccion de fecha

    console.log('fecha selecionada y concatenada: ' + e + ' update horas:'+this.horas);
    this.citaService.getcitasByFecha(e).subscribe(
      (citas) =>  {
        this.citas = citas;
        console.log('citas:  ',citas as Cita[]);
        citas.forEach(element => {
          if ( this.horasVerano.includes(element.fecha.substring(element.fecha.length-5,element.fecha.length))) {
           let indice =  this.horas.indexOf(element.fecha.substring(element.fecha.length-5,element.fecha.length));
           console.log('indice:'+indice);
           console.log('horas disponible a empezar:'+this.horas);
           this.horas.splice(indice,1);
           console.log('horas despues:'+this.horas);
            console.log(element.fecha.substring(element.fecha.length-5,element.fecha.length));
          }
        });
      }
    );

  }

  selectHora(value) :void{
    this.horaSeleccionada = value;
    console.log('hora seleccionada selecthora: '+ value);
    console.log('fecha seleccionada: '+ this.fechaSeleccionada);
    if (value != 'undefined') { // el primer valor de la hora es undefined porque esta disabled.
      this.citaForm.fecha = this.fechaSeleccionada + ' ' +  this.horaSeleccionada;
    }


  }

}
