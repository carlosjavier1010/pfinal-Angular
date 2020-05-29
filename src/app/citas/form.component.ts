import { Component, OnInit, Output } from '@angular/core';
import { Cita } from './cita';
import { CitaService } from './cita.service';
import { Router } from '@angular/router';
import swal from 'sweetalert2';
import { Usuario } from '../usuarios/usuario';
import { UsuarioService } from '../usuarios/usuario.service';
import { Observable, concat } from 'rxjs';
import { AuthService } from '../usuarios/auth.service';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';

@Component({
  selector: 'app-form',
  templateUrl: './form.component.html',
  styleUrls: ['./form.component.scss']
})
export class FormComponent implements OnInit {
  citas: Cita [] = [];
  citaForm: Cita = new Cita();
  titulo = 'Seleccione su cita';
  errores: string[];
  usuarioEnSesion: Usuario;
  idUsuario: number;
  usuarios: Usuario[] = [];
  fechaSeleccionada: string;
  horaSeleccionada: string;
  horas: String[] = [];
  horasVerano: String[] = ['09:00', '09:30', '10:00', '10:30', '11:00', '11:30', '12:00', '12:30', '13:00', '13:30', '18:00', '18:30'
, '19:00', '19:30', '20:00', '20:30'];
  horasNoDisponibles: String[];
  isLinear = false;
  firstFormGroup: FormGroup;
  secondFormGroup: FormGroup;
  isEditable = false;
  fechaMinima: string;
  fechaMaxima: string;
  fechaDate: Date;
  dia: string;
  mes: string;
  anio: string;
  horaActual: string;
  constructor(public citaService: CitaService,
              public router: Router, public usuarioService: UsuarioService,
              public authService: AuthService, private _formBuilder: FormBuilder) {

      this.citaForm = new Cita();
      this.citaForm.user = new Usuario;
      this.citaForm.user.id = 0;
      this.usuarioEnSesion = JSON.parse(sessionStorage.getItem('usuario')) as Usuario;
      console.log('este es el email: ' + this.usuarioEnSesion.email);





    }

  ngOnInit(): void {

    this.fechaDate = new Date();
    this.dia = this.fechaDate.getDate().toString();
    this.mes = (this.fechaDate.getMonth() + 1).toString();
    let mesComprobar = parseInt(this.mes);
    if (mesComprobar < 10) {
      this.mes = '0' + this.mes;
    }
    this.anio = this.fechaDate.getFullYear().toString();
    this.horaActual = this.fechaDate.getHours().toString();
    this.horaActual += ':' + this.fechaDate.getMinutes().toString();
    this.fechaMinima = this.anio + '-' + this.mes + '-' + this.dia;
    this.mes = (this.fechaDate.getMonth() + 2).toString();
    mesComprobar = parseInt(this.mes);
    if (mesComprobar < 10) {
      this.mes = '0' + this.mes;
    }
    this.fechaMaxima = this.anio + '-' + this.mes + '-' + this.dia;
    console.log(this.fechaMinima + ' ' + this.horaActual);
    this.firstFormGroup = this._formBuilder.group({
      firstCtrl: ['', Validators.required]
    });
    this.secondFormGroup = this._formBuilder.group({
      secondCtrl: ['', Validators.required]
    });
    this.citaForm.estado = 0;
    this.horaSeleccionada = '';

    const usuarioAutenticado = this.authService.usuario;
    console.log('usuario autenticado :::: ', usuarioAutenticado);
    this.citaForm.user.id = usuarioAutenticado.id;
    console.log('el id del usuario conectado es: ' + this.citaForm.user.id);

    // this.citas.user = new Usuario();

    /* this.citas.user.id =  */


  }

    create(): void {
    if (this.horaSeleccionada != '' && this.horaSeleccionada != 'Hora seleccionada' ) {
      console.log(this.citaForm);
      this.citaForm.fecha.replace('undefined', '');
      console.log('cita mandada' + this.citaForm);
      this.citaService.create(this.citaForm as Cita)
      .subscribe(
        cita => {
          this.router.navigate(['/citas']);
          swal.fire('Nueva cita ', `con fecha ${cita.fecha} ha sido creada con éxito`, 'success');
        },
        err => {
          this.errores = err.error.errors as string[];
          console.error('Código del error desde el backend: ' + err.status);
          if (this.horaSeleccionada == 'Seleccione una hora' && this.fechaSeleccionada != '' && this.fechaSeleccionada != 'undefined') {
            swal.fire('Hora no seleccionada', `debes seleccionar una hora`, 'info');
          } else {
            swal.fire('Fecha no seleccionada', `debes seleccionar una fecha`, 'info');
          }
          console.error(err.error.errors);
        }
      );
    } else if (this.fechaSeleccionada == '' || this.fechaSeleccionada == 'undefined') {
      swal.fire('Fecha no seleccionada', `debes seleccionar una fecha`, 'info');
    } else {
      swal.fire('Hora no seleccionada', `debes seleccionar una hora`, 'info');
    }
  }
  // Se ejecuta cada vez que cambiemos la fecha para comprobar las horas disponibles que puede seleccionar el usuario
  // Se comprueba que las horas de citas existentes en el servidor correspondientes a la fecha seleccionada no pueda
  // seleccionar el usuario esa hora, de esta forma, el usuario siempre coge entre horas disponibles
  selectFecha(e: string): void {
    this.horas = [];
    this.horas = [... this.horasVerano]; // clonar array para que vuelva a tener todas las horas, si no la hora que quitemos
    // nos saldrá quitada en la proxima seleccion de fecha
    let horaActualSinPuntos = this.horaActual.replace(':','');
    if (horaActualSinPuntos.length==3) {
       horaActualSinPuntos = horaActualSinPuntos.substring(0,2).concat('0').concat(horaActualSinPuntos.substring(3,4));

    }
    console.log('hora actual sin PUNTOS:'+horaActualSinPuntos);
    console.log('eeeee = ' + e);
    if (this.dia == e.substring(e.length-2,e.length)) {

        var contador = 0;
        var len = this.horas.length;
        while (contador < len ) {
          let horaSinPuntos = this.horas[contador].replace(':','');
          console.log('hora sin PUNTOS:'+horaSinPuntos);
          if (horaSinPuntos < horaActualSinPuntos) {

            this.horas.splice(contador,1);
            len = this.horas.length;
          }else{
            contador++;
          }

          console.log('COMPROBANDOOOOOO HORAAAAAA:'+this.horas[contador]);


        }
    }




    console.log('fecha selecionada y concatenada: ' + e + ' update horas:' + this.horas);
    this.citaService.getcitasByFecha(e).subscribe(
      (citas) =>  {
        this.citas = citas;
        console.log('citas:  ', citas as Cita[]);
        citas.forEach(element => {



          if ( this.horasVerano.includes(element.fecha.substring(element.fecha.length - 5, element.fecha.length))) {
           const indice =  this.horas.indexOf(element.fecha.substring(element.fecha.length - 5, element.fecha.length));
           console.log('indice:' + indice);
           console.log('horas disponible a empezar:' + this.horas);
           this.horas.splice(indice, 1);
           console.log('horas despues:' + this.horas);
           console.log(element.fecha.substring(element.fecha.length - 5, element.fecha.length));
          }
        });
      }
    );

  }

  selectHora(value): void {
    this.horaSeleccionada = value;
    if (this.horaSeleccionada == 'Seleccione una hora') {
      swal.fire('Hora no seleccionada', `debes seleccionar una hora`, 'info');
    }
    console.log('hora seleccionada selecthora: ' + value);
    console.log('fecha seleccionada: ' + this.fechaSeleccionada);
    if (value != 'undefined') { // el primer valor de la hora es undefined porque esta disabled.
      this.citaForm.fecha = this.fechaSeleccionada + ' ' +  this.horaSeleccionada;
    }


  }

}
