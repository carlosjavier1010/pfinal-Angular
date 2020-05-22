import { Injectable } from '@angular/core';
import { Usuario } from './usuario';
import { HttpClient, HttpRequest, HttpEvent, HttpHeaders } from '@angular/common/http';
import { map, catchError, tap } from 'rxjs/operators';
import { Observable, throwError } from 'rxjs';

import { Router } from '@angular/router';

@Injectable()
export class UsuarioService {
  public urlEndPoint: string = 'http://localhost:8080/api/clientes';


  constructor(public http: HttpClient, public router: Router) { }

  private isNoAutorizado(e): boolean{
    if (e.status==401 || e.status==403) {
      this.router.navigate(['/login'])
      return true;
    }
    return false;
  }


  getUsuarios(): Observable<Usuario[]> {
    // return of(citas);
    return this.http.get<Usuario[]>(this.urlEndPoint).pipe(
      catchError( e => {
        this.isNoAutorizado(e);
        return throwError(e);
      })
    )
}

}
