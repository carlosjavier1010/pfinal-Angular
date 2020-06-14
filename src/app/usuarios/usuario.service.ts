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
  private httpHeadersFile = new HttpHeaders();
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

  // al ser un archivo de tipo multipart-form-data, ya no es de application json, por lo que unicamente se le añade el token y listo
  public agregarAuthorizationHeaderFile(){
    let token = this.authService.token;
    /* this.httpHeadersFile.append('Content-Type', 'application/json'); */
    /* this.httpHeadersFile.append('Content-Type', undefined); */
    if(token != null){

      return this.httpHeadersFile.append('Authorization', 'Bearer ' + token);
    }
    return this.httpHeadersFile;

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
  // Los 3 mas pelaos para el inicio
getUsuariosMasPelaos(): Observable<Usuario[]> {
  // return of(citas);
  return this.http.get<Usuario[]>(this.urlEndPoint + '/maspelaos' , {headers: this.agregarAuthorizationHeader()}).pipe(
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

  // Listado de los usuarios ordenado de los que mas se han pelado a los que menos, para el listado del RANKING / Los mas pelaos
getUsuariosMasPelaosListado(): Observable<Usuario[]> {
  // return of(citas);
  return this.http.get<Usuario[]>(this.urlEndPoint + '/maspelaos/ranking' , {headers: this.agregarAuthorizationHeader()}).pipe(
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
        this.router.navigate(['/login']);
        console.error(e.error.mensaje);
      }else if(e.status == 401 || e.status == 404 && e.error.mensaje) {
        this.isNoAutorizado(e);
        return throwError(e);
      }

      return throwError(e);
    }),
    map( response => {
      const usuario = response as Usuario;
      return usuario;
}
)
);
}

setUsuarioById(usuario: Usuario): Observable<Usuario> {
  console.log(usuario);
  console.log('Nombre usuario :'+usuario.nombre);
  return this.http.put<Usuario>(this.urlEndPoint + '/' + usuario.id, usuario, {headers: this.agregarAuthorizationHeader()}).pipe(
    map( (response: any) => response.usuario as Usuario),
    catchError(e => {

      console.error(e.error.mensaje);
      Swal.fire(e.error.mensaje, e.error, 'error');
      return throwError(e);
    })
  );
}

CreateUsuario(usuario: Usuario): Observable<Usuario> {
  console.log(usuario);
  //console.log('Nombre usuario :'+usuario.nombre);
  return this.http.post<Usuario>(this.urlEndPoint, usuario, {headers: this.agregarAuthorizationHeader()}).pipe(
    map( (response: any) => response.usuario as Usuario),
    catchError(e => {

      console.error(e.error.mensaje);
      Swal.fire(e.error.mensaje, e.error, 'error');
      return throwError(e);
    })
  );
}

  DeleteUsuario(id: number) {
    return this.http.delete<Usuario>(this.urlEndPoint + '/' + id, {headers: this.agregarAuthorizationHeader()});
  }

subirFoto(archivo: File, id): Observable<HttpEvent<{}>> {
  const formData = new FormData();
  formData.append("archivo",archivo);
  formData.append("id",id);



  const req = new HttpRequest('POST', `${this.urlEndPoint}/upload`, formData , {
    headers: this.agregarAuthorizationHeaderFile(),
    reportProgress: true
  });

  return this.http.request(req);
}

}
