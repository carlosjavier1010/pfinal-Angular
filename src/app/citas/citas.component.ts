import { Component, OnInit } from '@angular/core';
import { Cita } from './cita';
import { CitaService } from './cita.service';
import { AuthService } from '../usuarios/auth.service';
import { Router } from '@angular/router';
import { Usuario } from '../usuarios/usuario';
import swal from 'sweetalert2';

@Component({
  selector: 'app-citas',
  templateUrl: './citas.component.html',
  styleUrls: ['./citas.component.scss']
})
export class CitasComponent implements OnInit {

  citas: Cita[] = [];
  usuarioAutenticado: Usuario;
  citaPendiente: boolean;
  constructor(public citaService: CitaService , public authService: AuthService) { }

  ngOnInit() {
    this.citaPendiente = false;

    this.usuarioAutenticado = this.authService.usuario;
    console.log(this.usuarioAutenticado.id);
    this.citaService.getcitasByUserId(this.usuarioAutenticado.id).subscribe(
      (citas) => {
        this.citas = citas;
        this.citas.forEach(element => {
          if (element.estado == 1) {
            this.citaPendiente = true;
          }
        });
      });


  }

  delete(cita: Cita){
    const swalWithBootstrapButtons = swal.mixin({
      customClass: {
        confirmButton: 'btn btn-success',
        cancelButton: 'btn btn-danger'
      },
      buttonsStyling: false
    })
    swalWithBootstrapButtons.fire({title: 'AVISO',
    text: '¿Seguro que desea anular la cita?',
    icon: 'warning',
    showCancelButton: true,
    confirmButtonColor: '#5cb85c',
    cancelButtonColor: '#d9534f',
    confirmButtonText: 'Si, anular!',
    cancelButtonText: 'No, cancelar!',
    buttonsStyling: false,
    reverseButtons: true,
    focusConfirm:false,
    focusCancel:true
  }).then(result => {
      if (result.value) {

        this.citaService.delete(cita.id).subscribe(
          () => {
            this.citas = this.citas.filter(cli => cli !== cita)
            swal.fire(
              'Cita Eliminada!',
              `Cita seleccionada con id ${cita.id} eliminada con éxito.`,
              'success'
            );
            this.citaPendiente = false;
          }

        )

      }
    });
  };

  alertCitaPendiente() :void {
    swal.fire('Cita Pendiente','Aún tienes una cita pendiente, para coger una nueva cita, por favor, anule la que ya tienes.','info');
    console.log('click');
  }



}
