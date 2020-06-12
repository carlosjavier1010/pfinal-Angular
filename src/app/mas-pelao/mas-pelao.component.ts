import { Component, OnInit } from '@angular/core';
import { trigger,style,transition,animate, state } from '@angular/animations';
import { UsuarioService } from '../usuarios/usuario.service';
import { Usuario } from '../usuarios/usuario';
@Component({
  selector: 'app-mas-pelao',
  templateUrl: './mas-pelao.component.html',
  styleUrls: ['./mas-pelao.component.scss'],
  animations:[
    trigger('enterState',[
      state('void',style({
        transform: 'translateY(-100%)',
        opacity:0
      })),
      transition(':enter',[
        animate(1000,style({
          transform:'translateY(0)',
          opacity:1.5
        }))
      ])
    ])
  ]
})
export class MasPelaoComponent implements OnInit {

  masPelaos: Usuario[];
  miarray: number[];
  constructor(public usuarioService: UsuarioService) { }

  ngOnInit(): void {
    this.cargarMasPelaosListado();

  }


  cargarMasPelaosListado(): void {
    this.usuarioService.getUsuariosMasPelaosListado().subscribe((usuario) => {

    this.masPelaos = usuario as Usuario[];

      //let usuarioo = JSON.stringify(this.usuario);

     });
  }

}
