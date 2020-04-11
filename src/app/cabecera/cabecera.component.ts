import { Component, OnInit } from '@angular/core';
import * as $ from 'jquery';
@Component({
  selector: 'app-cabecera',
  templateUrl: './cabecera.component.html',
  styleUrls: ['./cabecera.component.scss']
})
export class CabeceraComponent implements OnInit {

  constructor() { }
  public function;
  ngOnInit(): void {
    $(function() {

      // tslint:disable-next-line: deprecation
      $('.ir-arriba').click(() => {
        $('body, html').animate({
          scrollTop: '0px'
        }, 300);
      });

      // tslint:disable-next-line: deprecation
      $(window).scroll(() => {
        if ( $(this).scrollTop() > 0 ) {
          $('.ir-arriba').slideDown(300);
        } else {
          $('.ir-arriba').slideUp(300);
        }
      });

    });
  }
close() {

    $('.navbar-toggler').click();
  }

}
