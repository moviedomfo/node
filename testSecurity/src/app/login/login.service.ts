import { Injectable } from '@angular/core';
import { Http, Response, RequestOptions, Headers, URLSearchParams } from '@angular/http';
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
import { HealtConstants } from "../model/common";
import 'rxjs/add/observable/throw';
import { User } from "../model/user";

@Injectable()
export class LoginService {

  urlBase: string = 'http://localhost:8080/api/pub/users';


  constructor(   private http: Http, private httpHelpersService: HttpHelpersService) { }

  registry(user) {
    let ruta = `${this.urlBase}/newSession`;
    return this.comunicar(user, ruta);
  }

  logIn(user:User) {
  
    
    var params = {"user" :  user}
    console.log('Enviando credenciales para entrada: ' + JSON.stringify(user));
    
      return this.http.post(`${this.urlBase}/authenticate`,params, HealtConstants.httpOptions)
      .map(function (res: Response) {
         
        let session  = res.json();
        //this.httpHelpersService.saveCredentials(session);
    
        
         console.log(JSON.stringify(session));
        return session;
      });

  }


  comunicar(user, ruta) {
    // la llamada de seguridad debería devolvernos credenciales
    // parte de nuestra labor será guardarla para futuros usos
    let body = JSON.stringify(user);

    console.log('post to ' + ruta);
    let options = this.httpHelpersService.setHeader();
    
    return this.http
        .post(ruta, body, options)
        .map(this.httpHelpersService.getData)
        .map(this.httpHelpersService.saveCredentials)
        .catch(this.httpHelpersService.handleError);
  }


}
