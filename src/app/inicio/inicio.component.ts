import { Component, OnInit } from '@angular/core';
import { trigger,style,transition,animate, state } from '@angular/animations';
@Component({
  selector: 'app-inicio',
  templateUrl: './inicio.component.html',
  styleUrls: ['./inicio.component.scss'],
  animations:[
    trigger('enterState',[
      state('void',style({
        transform: 'translateY(-100%)',
        opacity:0
      })),
      transition(':enter',[
        animate(3500,style({
          transform:'translateY(0)',
          opacity:1.5
        }))
      ])
    ])
  ]
})
export class InicioComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {



  }

}
