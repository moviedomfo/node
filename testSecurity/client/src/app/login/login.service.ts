import { Injectable } from '@angular/core';
import { Http, Response, RequestOptions, Headers, URLSearchParams } from '@angular/http';
import { Observable } from 'rxjs/Observable';
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
import { AppConstants } from "../model/common";
import 'rxjs/add/observable/throw';
import { User } from "../model/user";

@Injectable()
export class LoginService {

  urlBase: string = 'http://localhost:8080/api/users';

  mensaje:string
  constructor(private http: Http, private httpService: HttpHelpersService) { }

  registry(user) {
    let ruta = `${this.urlBase}/newSession`;
    return this.comunicar(user, ruta);
  }

  logIn(user: User) {


    var params = { "user": user }
    // console.log('Enviando credenciales para entrada: ' + JSON.stringify(user));
    return this.http.post(`${this.urlBase}/authenticate`, params, AppConstants.httpOptions)
      .map(this.httpService.getData)
      .map(this.httpService.saveCredentials)
      .catch(this.httpService.handleError);


  }


  comunicar(user, ruta) {
    // la llamada de seguridad debería devolvernos credenciales
    // parte de nuestra labor será guardarla para futuros usos
    let body = JSON.stringify(user);

    console.log('post to ' + ruta);
    let options = this.httpService.setHeader();

    return this.http
      .post(ruta, body, options)
      .map(this.httpService.getData)
      .map(this.httpService.saveCredentials)
      .catch(this.httpService.handleError);
  }


}
