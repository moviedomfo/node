import { Injectable } from '@angular/core';

import { Observable } from "rxjs/Observable";
import { Http, Response, RequestOptions, Headers } from '@angular/http';
import { Router } from "@angular/router";
import 'rxjs/add/observable/throw';
@Injectable()
export class HttpHelpersService {

  private static _router: Router;
  private static _token: any;
  
  constructor(private router: Router ) {
    HttpHelpersService._router=this.router;
  }
  // puesto que los envíos requieren siempre la misma configuración
  setHeader() {
    let headers = new Headers({
      'Content-Type': 'application/json',
      'token': HttpHelpersService._token
    });
    // llamar a este método en cada llamda, equivale a los interceptores de Angular1
    let options = new RequestOptions({ headers: headers });
    return options;
  }
  // para extraer los datos json de la respuesta http 
  getData(response) { 
      // TODO: validar el satusCode y controlar vacíos
      console.log("getData " +response.json());
      return response.json() ;
    }
  
  // tratar errores de comunicación
  handleError(error) {
    console.log(JSON.stringify(error));

    if (error.status == 401) {
      console.log("Error de permisos");
      HttpHelpersService._router.navigate(['login']);
    }
    else {
      console.log("Otro Error");
    }
    return Observable.throw(error._body);
  } 

  // despues de obtener credenciales  
  saveCredentials(token) {
    // guardar credenciales
    console.log('Guardando token: ' + token);
    HttpHelpersService._token = token;
    // ir a la página principal
    HttpHelpersService._router.navigate(['']);
    return token;
  }

}
