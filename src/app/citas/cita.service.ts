import { Injectable } from '@angular/core';
import { Cita } from './cita';
import { of , Observable , throwError } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { map , catchError } from 'rxjs/operators';
import { formatDate , DatePipe } from '@angular/common';
import { Router } from '@angular/router';
import { UsuarioService } from '../usuarios/usuario.service';
import { Usuario } from '../usuarios/usuario';
import { AuthService } from '../usuarios/auth.service';

@Injectable({
  providedIn: 'root'
})
export class CitaService {

  urlBase = 'https://peluqueria-jdomi.herokuapp.com/api/';

  public urlEndPoint: string = this.urlBase + 'citas';

  public httpHeaders = new HttpHeaders({'Content-Type': 'application/json'});

  constructor(public http: HttpClient, public router: Router, public usuarioService: UsuarioService, public authService: AuthService) { }



  getcitasByUserId(id: number): Observable<Cita[]> {

    console.log("id usuario autenticado desde el service:::: "+ id);
    // return of(citas);
    return this.http.get<Cita[]>(this.urlEndPoint + '/user/' + id, {headers: this.usuarioService.agregarAuthorizationHeader()}).pipe(
      catchError( e => {
        this.usuarioService.isNoAutorizado(e);
        return throwError(e);
      }),
      map( response => {
        const citas = response as Cita[];
        return citas.map(cita => {
          // formatDate(cita.fecha,'dd-MM-yyyy | hh:mm','en-US')

          const datePipe = new DatePipe('es');
          cita.fecha = datePipe.transform(cita.fecha, 'EEEE d\' de \' MMMM \' del \' y \' a las \' HH:mm');
          console.log('citas:::: ',cita);
          return cita;
        });
  }
 )
);
}

getcitasByFecha(fecha: string): Observable<Cita[]> {


  // return of(citas);
  return this.http.get<Cita[]>(this.urlEndPoint + '/fecha/' + fecha, {headers: this.usuarioService.agregarAuthorizationHeader()}).pipe(
    catchError( e => {
      this.usuarioService.isNoAutorizado(e);
      return throwError(e);
    }),
    map( response => {
      const citas = response as Cita[];
      return citas.map(cita => {
        // formatDate(cita.fecha,'dd-MM-yyyy | hh:mm','en-US')

        const datePipe = new DatePipe('es');
        cita.fecha = datePipe.transform(cita.fecha, 'EEEE, d MMMM y | HH:mm');
        console.log('citas:::: ',cita);
        return cita;
      });
}
)
);
}

  create(citas: Cita): Observable<Cita> {
    console.log(citas);
    console.log('fecha cita observable service:'+citas.fecha);
    return this.http.post<Cita>(this.urlEndPoint, citas, {headers: this.usuarioService.agregarAuthorizationHeader()} );
  }

  delete(id: number): Observable<Cita> {

    return this.http.delete<Cita>(this.urlEndPoint + '/' + id,  {headers: this.usuarioService.agregarAuthorizationHeader()} )
    .pipe(
      catchError(e => {
        if (e.error.mensaje) {
          console.error(e.error.mensaje);
        }
        return throwError(e );

      }));
  }

}
