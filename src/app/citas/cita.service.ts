import { Injectable } from '@angular/core';
import { Cita } from './cita';
import { of , Observable , throwError } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { map , catchError } from 'rxjs/operators';
import { formatDate , DatePipe } from '@angular/common';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class CitaService {

  urlBase = 'http://localhost:8080/api/';

  public urlEndPoint: string = this.urlBase + 'citas';

  public httpHeaders = new HttpHeaders({'Content-Type': 'application/json'})

  constructor(public http: HttpClient, public router: Router) { }

  private isNoAutorizado(e): boolean{
    if (e.status==401 || e.status==403) {
      this.router.navigate(['/login'])
      return true;
    }
    return false;
  }

  getcitas(): Observable<Cita[]> {
    // return of(citas);
    return this.http.get<Cita[]>(this.urlEndPoint).pipe(
      catchError( e => {
        this.isNoAutorizado(e);
        return throwError(e);
      }),
      map( response => {
        const citas = response as Cita[];
        return citas.map(cita => {
          // formatDate(cita.fecha,'dd-MM-yyyy | hh:mm','en-US')

          const datePipe = new DatePipe('es');
          cita.fecha = datePipe.transform(cita.fecha, 'EEEE, d MMMM y | HH:mm');
          console.log(cita);
          return cita;
        });
  }
 )
);
}

  create(citas: Cita) : Observable<Cita>{
    return this.http.post<Cita>(this.urlEndPoint, citas, {headers:this.httpHeaders} )
  }

}
