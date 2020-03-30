import { Component, OnInit } from '@angular/core';
import * as $ from 'jquery';
@Component({
  selector: 'app-cabecera',
  templateUrl: './cabecera.component.html',
  styleUrls: ['./cabecera.component.scss']
})
export class CabeceraComponent implements OnInit {

  constructor() { }
  public function
  ngOnInit(): void {

  }
close() {
    // tslint:disable-next-line: deprecation
    $('.navbar-toggler').click();
  }
}
