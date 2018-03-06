import { Injectable } from '@angular/core';

import { Observable } from "rxjs/Observable";
import { Http, Response, RequestOptions, Headers } from '@angular/http';
import { Router } from "@angular/router";
import 'rxjs/add/observable/throw';
import { BehaviorSubject } from "rxjs/BehaviorSubject";
import { Session } from "../model/user";
import { AppConstants } from "../model/common";
@Injectable()
export class HttpHelpersService {


  private  currentSession: Session;
  //Se declaran static para q sean accedidas desde callbacks cuando se hacen pop y/o gets a servicios 
  private static router: Router;
  //Create a stream of logged in status to communicate throughout app
  static loggedIn: boolean;
  static loggedIn$ = new BehaviorSubject<boolean>(HttpHelpersService.loggedIn);

  constructor(private router: Router, private http: Http) {
    HttpHelpersService.router=this.router;
    this.currentSession = new Session();
    

    if (this.authenticated) {
       HttpHelpersService.setLoggedIn(true);
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
    const expTime = AppConstants.expiresIn * 1000 + Date.now();
    localStorage.setItem('x-access-token', session.token);
    localStorage.setItem('profile', JSON.stringify(session.user));
    localStorage.setItem('expires_at', JSON.stringify(expTime));
    //this.userProfile = session.user;
    HttpHelpersService.setLoggedIn(true);


    // ir a la página principal
    HttpHelpersService.router.navigate(['']);

  }


  // Remove tokens and profile and update login status subject
  logout() {

    localStorage.removeItem('x-access-token');
    localStorage.removeItem('profile');
    localStorage.removeItem('expires_at');

    HttpHelpersService.setLoggedIn(false);
  }
  //Se declaran static para q sean accedidas desde callbacks cuando se hacen pop y/o gets a servicios 
  public static setLoggedIn(value: boolean) {
    // Update login status subject
    HttpHelpersService.loggedIn$.next(value);
    HttpHelpersService.loggedIn = value;
  }



  setHeader() {
    
    console.log('Set header--------------------------------------' ); 
    //console.log( headers);
    //headers.append(   'x-access-token', localStorage.getItem('x-access-token'));
    //let headers = new Headers({'x-access-token': localStorage.getItem('x-access-token') });
    let headers = new Headers();
    headers.append(  'x-access-token', localStorage.getItem('x-access-token'));
    AppConstants.httpHeaders.forEach(item=>{
      console.log(item[0]  + ' ' + AppConstants.httpHeaders.get(item[0]));
      //headers.append(  item[0] , AppConstants.httpHeaders.get(item[0]));
    }); 
    
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
    if (error.status == 404) {
      console.log("Not found url " + error.url);
    }
    return Observable.throw(error);
  }


  checkSession(): Observable<any> {
    var httpOptions = this.setHeader();

    let params = {

    };

    return this.http.post(`${AppConstants.baseUrl_security}/checkSession`, params, httpOptions)
      .map(function (res: Response) {

        return res.json();
        //console.log(JSON.stringify(res));

      });


  }

}
