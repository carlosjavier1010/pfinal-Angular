import { Injectable } from '@angular/core';
import { Usuario } from './usuario';
import { HttpClient, HttpRequest, HttpEvent, HttpHeaders } from '@angular/common/http';
import { map, catchError, tap } from 'rxjs/operators';
import { Observable, throwError } from 'rxjs';
import { AuthService } from '../usuarios/auth.service';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';

@Injectable()
export class UsuarioService {
  public urlEndPoint = 'http://localhost:8080/api/clientes';

  private httpHeaders = new HttpHeaders({ 'Content-Type': 'application/json' });

  constructor(public http: HttpClient, public router: Router,
    public authService: AuthService) { }
  //Metodo que tenemos que incluir como header despues del urlEndpoints en los metodos con accesso al recurso que sea protegido
  public agregarAuthorizationHeader(){
    let token = this.authService.token;
    if(token != null){
      return this.httpHeaders.append('Authorization', 'Bearer ' + token);
    }
    return this.httpHeaders;
  }

  public isNoAutorizado(e): boolean {
    if (e.status == 401) {
      if (this.authService.isAuthenticated()) {
        this.authService.logout();
      }
      this.router.navigate(['/login']);
      return true;
    }
    if (e.status == 403) {
       this.router.navigate(['/citas']);
       Swal.fire('Acceso denegado', `Hola ${this.authService.usuario.nombre} No tienes permisos para accceder a este recurso`,'error');

      return true;
    }
    return false;
  }


  getUsuarios(): Observable<Usuario[]> {
    // return of(citas);
    return this.http.get<Usuario[]>(this.urlEndPoint, {headers: this.agregarAuthorizationHeader()}).pipe(
      catchError( e => {
        this.isNoAutorizado(e);
        return throwError(e);
      }),
      map( response => {
        const usuarios = response as Usuario[];
        return usuarios.map(usuario => {
          console.log('usuarios:::: ',usuario);
          return usuario;
        });
  }
 )
);
}

getUsuarioById(id: number): Observable<Usuario> {
  // return of(citas);
  return this.http.get<Usuario>(this.urlEndPoint + '/' + id, {headers: this.agregarAuthorizationHeader()}).pipe(
    catchError(e => {
      if (e.status != 401 && e.error.mensaje) {
        this.router.navigate(['/inicio']);
        console.error(e.error.mensaje);
      }

      return throwError(e);
    }));
}

setUsuarioById(usuario: Usuario): Observable<Usuario> {
  console.log(usuario);
  console.log('Nombre usuario :'+usuario.nombre);
  return this.http.put<Usuario>(this.urlEndPoint + '/' + usuario.id, usuario, {headers: this.agregarAuthorizationHeader()});
}

}
