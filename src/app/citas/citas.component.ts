import { Component, OnInit } from '@angular/core';
import { Cita } from './cita';
import { CitaService } from './cita.service';
@Component({
  selector: 'app-citas',
  templateUrl: './citas.component.html',
  styleUrls: ['./citas.component.scss']
})
export class CitasComponent implements OnInit {

  citas: Cita[] = [];
  constructor(private citaService: CitaService) { }

  ngOnInit() {
    this.citaService.getcitas().subscribe(
      citas => this.citas = citas
    );
  }

}
