import { Component, OnInit } from '@angular/core';
import { Cita } from './cita';
import { CitaService } from './cita.service';
import { Router } from '@angular/router';
import swal from 'sweetalert2';
import { Usuario } from '../usuarios/usuario';
import { UsuarioService } from '../usuarios/usuario.service';
import { AuthService } from '../usuarios/auth.service';
import {
  FormGroup,
  FormControl,
  Validators,
  ValidationErrors,
} from '@angular/forms';
import { DatePipe } from '@angular/common';

@Component({
  selector: 'app-form',
  templateUrl: './form.component.html',
  styleUrls: ['./form.component.scss'],
})
export class FormComponent implements OnInit {
  citas: Cita[] = [];
  citaForm: Cita = new Cita();
  titulo = 'Seleccione su cita';
  errores: string[];
  usuarioEnSesion: Usuario;
  idUsuario: number;
  usuarios: Usuario[] = [];
  fechaSeleccionada: string;
  horaSeleccionada: string;
  horas: String[] = [];
  horasVerano: String[] = [
    '09:00',
    '09:30',
    '10:00',
    '10:30',
    '11:00',
    '11:30',
    '12:00',
    '12:30',
    '13:00',
    '13:30',
    '18:00',
    '18:30',
    '19:00',
    '19:30',
    '20:00',
    '20:30',
  ];
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
  formGroup: FormGroup;
  fechaC: string;

  constructor(
    public citaService: CitaService,
    public router: Router,
    public usuarioService: UsuarioService,
    public authService: AuthService
  ) {
    this.formGroup = new FormGroup({
      fechaC: new FormControl('', [this.validateFecha]),
      hora: new FormControl(
        { value: '' },
        Validators.compose([Validators.required])
      ),
    });
    this.citaForm = new Cita();
    this.citaForm.user = new Usuario();
    this.citaForm.user.id = 0;
    this.fechaC = '';
    this.citaForm.estado = 1;
    this.usuarioEnSesion = JSON.parse(
      sessionStorage.getItem('usuario')
    ) as Usuario;
    console.log('este es el email: ' + this.usuarioEnSesion.email);
  }

  ngOnInit(): void {
    this.fechaMinMax();

    // this.citas.user = new Usuario();

    /* this.citas.user.id =  */
  }

  create(): void {
    if (
      this.horaSeleccionada !== '' &&
      this.horaSeleccionada !== 'Hora seleccionada'
    ) {
      console.log(this.citaForm);
      this.citaForm.fecha.replace('undefined', '');
      console.log('cita mandada' + this.citaForm);
      this.citaService.create(this.citaForm as Cita).subscribe(
        (cita) => {
          this.router.navigate(['/citas']);
          const datePipe = new DatePipe('es');
          cita.fecha = datePipe.transform(
            cita.fecha,
            'EEEE d\' de \' MMMM \' del \' y \' a las \' HH:mm'
          );
          swal.fire(
            'Nueva cita ',
            `con fecha ${cita.fecha} ha sido creada con éxito`,
            'success'
          );
        },
        (err) => {
          this.errores = err.error.errors as string[];
          console.error('Código del error desde el backend: ' + err.status);
          if (
            this.horaSeleccionada === 'Seleccione una hora' &&
            this.fechaSeleccionada !== '' &&
            this.fechaSeleccionada !== 'undefined'
          ) {
            swal.fire(
              'Hora no seleccionada',
              `debes seleccionar una hora`,
              'info'
            );
          } else {
            swal.fire(
              'Fecha no seleccionada',
              `debes seleccionar una fecha`,
              'info'
            );
          }
          console.error(err.error.errors);
        }
      );
    } else if (
      this.fechaSeleccionada === '' ||
      this.fechaSeleccionada === 'undefined'
    ) {
      swal.fire('Fecha no seleccionada', `debes seleccionar una fecha`, 'info');
    } else if (this.horaSeleccionada === '') {
      swal.fire('Hora esta vacia', `debes seleccionar una hora`, 'info');
    }
  }
  // Se ejecuta cada vez que cambiemos la fecha para comprobar las horas disponibles que puede seleccionar el usuario
  // Se comprueba que las horas de citas existentes en el servidor correspondientes a la fecha seleccionada no pueda
  // seleccionar el usuario esa hora, de esta forma, el usuario siempre coge entre horas disponibles
  selectFecha(e: string): void {
    this.horas = [];
    this.horas = [...this.horasVerano]; // clonar array para que vuelva a tener todas las horas, si no la hora que quitemos saldra quitada

    // quitamos las horas que ya han pasado del dia actual para que no puedan coger una hora que ya ha pasado,
    // solo hora futura de dicho dia
    this.quitarHorasPasadas(e);

    console.log(
      'fecha selecionada y concatenada: ' + e + ' update horas:' + this.horas
    );
    this.citaService.getcitasByFecha(e).subscribe((citas) => {
      this.citas = citas;
      console.log('citas:  ', citas as Cita[]);
      citas.forEach((element) => {
        if (
          this.horasVerano.includes(
            element.fecha.substring(
              element.fecha.length - 5,
              element.fecha.length
            )
          )
        ) {
          const indice = this.horas.indexOf(
            element.fecha.substring(
              element.fecha.length - 5,
              element.fecha.length
            )
          );
          console.log('indice:' + indice);
          console.log('horas disponible a empezar:' + this.horas);
          this.horas.splice(indice, 1);
          console.log('horas despues:' + this.horas);
          console.log(
            element.fecha.substring(
              element.fecha.length - 5,
              element.fecha.length
            )
          );
        }
      });
    });
  }

  selectHora(): void {
    if (this.horaSeleccionada === 'Seleccione una hora') {
      swal.fire('Hora no seleccionada', `debes seleccionar una hora`, 'info');
    }
    console.log('hora seleccionada selecthora: ' + this.horaSeleccionada);
    console.log('fecha seleccionada: ' + this.fechaSeleccionada);
    if (this.horaSeleccionada !== 'undefined') {
      // el primer valor de la hora es undefined porque esta disabled.
      this.citaForm.fecha =
        this.fechaSeleccionada + ' ' + this.horaSeleccionada;
    }
  }

  quitarHorasPasadas(e: string): boolean {
    // refrescamos de nuevo la hora actual para evitar errores de poco margen de minutos

    this.horaActual = this.fechaDate.getHours().toString();
    this.horaActual += ':' + this.fechaDate.getMinutes().toString();
    let quitadas = false;
    let mesArr = e.split('-');
    let mes = mesArr[1];
    /* if (mes.substring(0,1) == "0") {

    } */
    console.log('mes Date' + mes);
    console.log('mes fecha seleccionada:' + this.mes);
    // nos saldrá quitada en la proxima seleccion de fecha
    let horaActualSinPuntos = this.horaActual.replace(':', '');
    if (horaActualSinPuntos.length === 3) {
      horaActualSinPuntos = horaActualSinPuntos
        .substring(0, 2)
        .concat('0')
        .concat(horaActualSinPuntos.substring(3, 4));
    }else if(horaActualSinPuntos.length === 2){
      horaActualSinPuntos = horaActualSinPuntos
      .substring(0, 1)
      .concat('0')
      .concat(horaActualSinPuntos.substring(1, 2));
    }
    console.log('hora actual sin PUNTOS:' + horaActualSinPuntos);
    console.log('eeeee = ' + e);
    if (this.dia === e.substring(e.length - 2, e.length) && this.mes === mes) {
      let contador = 0;
      let len = this.horas.length;
      while (contador < len) {
        let horaSinPuntos = this.horas[contador].replace(':', '');
        /* if (horaSinPuntos.substring(0,1) == "0") {
          horaSinPuntos = horaSinPuntos.substring(1,horaSinPuntos.length);
        } */
        console.log('hora sin PUNTOS:' + horaSinPuntos);
        if (parseInt(horaSinPuntos) < parseInt(horaActualSinPuntos)) {
          this.horas.splice(contador, 1);
          quitadas = true;
          len = this.horas.length;
        } else {
          contador++;
        }

        console.log('COMPROBANDOOOOOO HORAAAAAA:' + this.horas[contador]);
      }
      return quitadas;
    }
  }

  // Validamos que no sea fin de semana, para que no se pueda coger cita un fin de semana
  validateFecha(control: FormControl): ValidationErrors {
    const fechaa = '' + control.value;

    const anioC = fechaa.substring(0, 4);
    let mesC = fechaa.substring(5, 7);
    let diaC = fechaa.substring(8, 10);

    if (diaC.substring(0, 1) === '0') {
      diaC = diaC.substring(1, 2);
    }
    let mesCC = parseInt(fechaa.substring(6, 7));

    if (parseInt(fechaa.substring(5, 7)) === 12) {
      mesC = '11';
    } else if (parseInt(fechaa.substring(5, 7)) === 11) {
      mesC = '10';
    } else if (parseInt(fechaa.substring(5, 7)) === 10) {
      mesC = '9';
    } else {
      mesCC--;
      mesC = '0' + mesCC;
    }

    console.log('form validator::::' + anioC + ' ' + mesC + ' ' + diaC);

    const myDate = new Date();
    myDate.setFullYear(parseInt(anioC));
    myDate.setMonth(parseInt(mesC));
    myDate.setDate(parseInt(diaC));
    console.log('form day:::::' + myDate.getDay());
    let error = null;
    if (myDate.getDay() === 6 || myDate.getDay() === 0) {
      error = {
        ...error,
        fecha: 'Seleccione un dia que no sea ni sabado ni domingo.',
      };
      swal.fire(
        'Fin de Semana',
        'Has seleccionado un dia que es sabado o domingo, por favor, seleccione otro dia.',
        'warning'
      );
      return { validateFecha: true };
    } else {
      return null;
    }
  }

  fechaMinMax(): void {
    this.fechaDate = new Date();
    this.dia = this.fechaDate.getDate().toString();
    if (parseInt(this.dia) < 10) {
      this.dia = '0' + this.dia;
    }
    this.mes = (this.fechaDate.getMonth() + 1).toString();
    let mesComprobar = parseInt(this.mes);
    if (mesComprobar < 10) {
      this.mes = '0' + this.mes;
    }
    this.anio = this.fechaDate.getFullYear().toString();
    this.horaActual = this.fechaDate.getHours().toString();
    this.horaActual += ':' + this.fechaDate.getMinutes().toString();
    this.fechaMinima = this.anio + '-' + this.mes + '-' + this.dia;
    let mesMax = (this.fechaDate.getMonth() + 2).toString();
    mesComprobar = parseInt(mesMax);
    if (mesComprobar < 10) {
      mesMax = '0' + mesMax;
    }

    // ultimoDiaMesProximo, obtenemos el ultimo dia del proximo mes como fecha maxima para el calendario del formulario
    const ultimoDiaMesProximo = new Date(
      parseInt(this.anio),
      parseInt(mesMax),
      0
    ).getDate();
    this.fechaMaxima = this.anio + '-' + mesMax + '-' + ultimoDiaMesProximo;

    console.log(
      'fecha minima es::::' + this.fechaMinima + ' ' + this.horaActual
    );
    console.log(
      'fecha MAXIMA es::::' + this.fechaMaxima + ' ' + this.horaActual
    );

    this.horaSeleccionada = '';

    const usuarioAutenticado = this.authService.usuario;
    console.log('usuario autenticado :::: ', usuarioAutenticado);
    this.citaForm.user.id = usuarioAutenticado.id;
    console.log('el id del usuario conectado es: ' + this.citaForm.user.id);
  }
}
