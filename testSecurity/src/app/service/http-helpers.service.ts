import { Injectable } from '@angular/core';

import { Observable } from "rxjs/Observable";
import { Http, Response, RequestOptions, Headers } from '@angular/http';
import { Router } from "@angular/router";
import 'rxjs/add/observable/throw';
import { BehaviorSubject } from "rxjs/BehaviorSubject";
import { Session } from "../model/user";
import { HealtConstants } from "../model/common";
@Injectable()
export class HttpHelpersService {


  private  currentSession: Session;

  private static _expiresIn: number;

  //Create a stream of logged in status to communicate throughout app
  loggedIn: boolean;
  loggedIn$ = new BehaviorSubject<boolean>(this.loggedIn);

  constructor(private router: Router, private http: Http) {

    this.currentSession = new Session();
    HttpHelpersService._expiresIn = 60;

    if (this.authenticated) {
      //this.userProfile = JSON.parse(localStorage.getItem('profile'));
      this.setLoggedIn(true);
    } else {
      this.logout();
    }

  }

  // Check if current date is greater than expiration
  // if it expires  means that current session was terminated or is not available
  get authenticated(): boolean {
    const expiresAt = JSON.parse(localStorage.getItem('expires_at'));
    let s: Session = new Session();
    var not_expired= Date.now() < expiresAt;
    
    if(not_expired){
     s.token = localStorage.getItem('x-access-token');
      s.profile = JSON.parse(localStorage.getItem('profile'));
      s.expires_at = localStorage.getItem('expires_at');
      this.currentSession = s;
    }
    else{
      this.currentSession.expires_at="";
      this.currentSession.token="";
      this.currentSession.profile=null;
    }
    return not_expired ; //Date.now() < expiresAt;
  }

  
  // despues de obtener credenciales  
  saveCredentials(session) {
    const expTime = HttpHelpersService._expiresIn * 1000 + Date.now();
    localStorage.setItem('x-access-token', session.token);
    localStorage.setItem('profile', JSON.stringify(session.user));
    localStorage.setItem('expires_at', JSON.stringify(expTime));
    //this.userProfile = session.user;
    this.setLoggedIn(true);


    // ir a la página principal
    this.router.navigate(['']);

  }


  // Remove tokens and profile and update login status subject
  logout() {

    localStorage.removeItem('x-access-token');
    localStorage.removeItem('profile');
    localStorage.removeItem('expires_at');

    this.setLoggedIn(false);
  }

  setLoggedIn(value: boolean) {
    // Update login status subject
    this.loggedIn$.next(value);
    this.loggedIn = value;
  }

  // puesto que los envíos requieren siempre la misma configuración
  setHeader() {
    let headers = new Headers({
      'Content-Type': 'application/json',
      //'token': HttpHelpersService._token
      'x-access-token': localStorage.getItem('x-access-token')
    });

    headers.append('Access-Control-Allow-Methods', 'GET, POST, PATCH, PUT, DELETE, OPTIONS');
    headers.append('Access-Control-Allow-Headers', 'Content-Type, Access-Control-Allow-Headers, Authorization, X-Requested-With');
    headers.append('Access-Control-Allow-Origin', 'http://localhost:4200');

    // llamar a este método en cada llamda, equivale a los interceptores de Angular1
    let options = new RequestOptions({ headers: headers });
    return options;
  }
  // para extraer los datos json de la respuesta http 
  getData(response) {
    // TODO: validar el satusCode y controlar vacíos
    //console.log("getData " +response.json());
    return response.json();
  }

  // tratar errores de comunicación
  handleError(error) {
    console.log(JSON.stringify(error));
    if (!error) return;
    if (error.status == 401) {
      console.log("Error de permisos");
      this.router.navigate(['login']);
    }
    else {
      console.log("Otro Error");
    }
    return Observable.throw(error._body);
  }


  checkSession(): Observable<any> {
    var httpOptions = this.setHeader();

    let params = {

    };

    return this.http.post(`${HealtConstants.baseUrl_security}/checkSession`, params, httpOptions)
      .map(function (res: Response) {

        return res.json();
        //console.log(JSON.stringify(res));

      });


  }

}
