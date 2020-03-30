import { Component, OnInit } from '@angular/core';
import { trigger,style,transition,animate, state } from '@angular/animations';
import { Perfil } from '../models/perfil';
@Component({
  selector: 'app-perfil',
  templateUrl: './perfil.component.html',
  styleUrls: ['./perfil.component.scss'],
  animations:[
    trigger('enterState',[
      state('void',style({
        transform: 'translateY(-100%)',
        opacity:0
      })),
      transition(':enter',[
        animate(1500,style({
          transform:'translateY(0)',
          opacity:1.5
        }))
      ])
    ])
  ]
})
export class PerfilComponent implements OnInit {

  constructor(
  ) {

   }

  ngOnInit(): void {
  }

}
