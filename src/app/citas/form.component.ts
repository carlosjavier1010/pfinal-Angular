import { Component, OnInit } from '@angular/core';
import { Cita } from './cita';
import { CitaService } from './cita.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-form',
  templateUrl: './form.component.html',
  styleUrls: ['./form.component.scss']
})
export class FormComponent implements OnInit {
  public citas: Cita = new Cita()
  public titulo: string = "Seleccione su cita";

  constructor(private citaService: CitaService,
    private router: Router) {this.citas.estado = false; }

  ngOnInit(): void {

  }

  public create(): void{
    this.citaService.create(this.citas).subscribe(
      response => this.router.navigate(['/citas'])
    )
  }

}
