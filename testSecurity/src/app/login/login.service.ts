import { Injectable } from '@angular/core';
import { Http, Response, RequestOptions, Headers } from '@angular/http';
import { Observable }     from 'rxjs/Observable';
/**
 * La libreria RxJS viene desglosada en operaciones
 * Hay que importarlas de forma individual
 */
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch'
/**
 * Importación del servicicio de utilidad
 */
import { HttpHelpersService } from '../service/http-helpers.service'


@Injectable()
export class LoginService {

  urlBase: string = 'http://localhost:8080/api';
  
  constructor(   private http: Http, private httpHelpersService: HttpHelpersService) { }

  registry(credenciales) {
    let ruta = `${this.urlBase}/pub/users`;
    return this.comunicar(credenciales, ruta);
  }

  logIn(credenciales) {
    let ruta = `${this.urlBase}/pub/sessions`;
    return this.comunicar(credenciales, ruta);
  }


  comunicar(credenciales, ruta) {
    // la llamada de seguridad debería devolvernos credenciales
    // parte de nuestra labor será guardarla para futuros usos
    let body = JSON.stringify(credenciales);
    console.log(body);
    let options = this.httpHelpersService.setHeader();
    
    return this.http
        .post(ruta, body, options)
        .map(this.httpHelpersService.getData)
        .map(this.httpHelpersService.saveCredentials)
        .catch(this.httpHelpersService.handleError);
  }


}
