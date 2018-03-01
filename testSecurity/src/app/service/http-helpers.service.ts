import { Injectable } from '@angular/core';

import { Observable } from "rxjs/Observable";
import { Http, Response, RequestOptions, Headers } from '@angular/http';
import { Router } from "@angular/router";
import 'rxjs/add/observable/throw';
import { BehaviorSubject } from "rxjs/BehaviorSubject";
@Injectable()
export class HttpHelpersService {

  private static _router: Router;
  private static _token: any;
  private static _authenticated :boolean;
  private static _expiresIn:number;
  userProfile: any;
  //Create a stream of logged in status to communicate throughout app
  loggedIn: boolean;
  loggedIn$ = new BehaviorSubject<boolean>(this.loggedIn);
  
  constructor(private router: Router ) {
    HttpHelpersService._router=this.router;
    HttpHelpersService._token="";
    HttpHelpersService._expiresIn=60;

    if (this.authenticated) {
      this.userProfile = JSON.parse(localStorage.getItem('profile'));
      this.setLoggedIn(true);
    } else {
      this.logout();
    }

  }

    // Check if current date is greater than expiration
  // if it expires  means that current session was terminated or is not available
  get authenticated(): boolean {
   const expiresAt = JSON.parse(localStorage.getItem('expires_at'));
    return Date.now() < expiresAt;
    //return HttpHelpersService._authenticated;
  }

    // despues de obtener credenciales  
    saveCredentials(session) {
      const expTime = HttpHelpersService._expiresIn  * 1000 + Date.now();
      const expiresAt = JSON.stringify((HttpHelpersService._expiresIn * 1000) + new Date().getTime());
      localStorage.setItem('token', session.token);

      localStorage.setItem('profile', JSON.stringify(session.user));
      localStorage.setItem('expires_at', JSON.stringify(expTime));
      this.userProfile = session.user;
      this.setLoggedIn(true);
      
       //console.log('token: ' + session.token);
      //HttpHelpersService._token = session.token;
      
      // ir a la página principal
      
      HttpHelpersService._router.navigate(['']);
      console.log('navigate');
    }
  // Remove tokens and profile and update login status subject
  logout() {
    
    localStorage.removeItem('token');
    
    localStorage.removeItem('profile');
    localStorage.removeItem('expires_at');
    this.userProfile = undefined;
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
      'token': localStorage.getItem('token')
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
      return response.json() ;
    }
  
  // tratar errores de comunicación
  handleError(error) {
    console.log(JSON.stringify(error));
    if(!error) return;
    if (error.status == 401) {
      console.log("Error de permisos");
      HttpHelpersService._router.navigate(['login']);
    }
    else {
      console.log("Otro Error");
    }
    return Observable.throw(error._body);
  } 




}
