import { Injectable, Inject} from '@angular/core';
import { AppConstants, contextInfo } from "../model/common.constants";
import { Param, IParam, IContextInformation, IRequest, IResponse, Result, AuthenticationOAutResponse, User, CurrentLogin } from '../model/common.model';

import { Observable } from 'rxjs';
import { map, catchError } from 'rxjs/operators';
import { Router } from '@angular/router';
import { CommonService } from '../service/common.service';
import 'rxjs/add/operator/map';
import { HttpParams, HttpHeaders, HttpClient } from '@angular/common/http';
//import 'rxjs/add/operator/map'

@Injectable()
export class AuthenticationService {

  public token: string;
  constructor(private commonService: CommonService, private http: HttpClient, private router: Router) {
    // set token if saved in local storage
    var currentUser = JSON.parse(localStorage.getItem('currentUser'));
    this.token = currentUser && currentUser.token;

  }

  //Este método de autenticacion usa jwk contra un rest asp api
  public oauthToken(userName: string, password: string): Observable< any> {


    const bodyParams = new HttpParams()
      .set(`username`, userName)
      .set(`password`, password)
      .set(`grant_type`, 'password')
      .set(`client_id`, AppConstants.oaut_client_id)
      .set(`client_secret`, AppConstants.oaut_client_secret);
    
      return  this.http.post<Result>(`${AppConstants.HealthOAuth_URL}`,
      bodyParams,AppConstants.httpClientOption_form_urlencoded ).pipe(
        map(res => {
          localStorage.setItem('currentLogin', JSON.stringify({ userName: userName, oAuth: res }));
         return res;
       })).pipe(catchError(this.commonService.handleError));

  }

  public refreshoauthToken(): Observable< AuthenticationOAutResponse> {

    let currentLogin:CurrentLogin = JSON.parse( localStorage.getItem('currentLogin') );

    //console.log(currentLogin.oAuth.refresh_token);
    const bodyParams = new HttpParams()
      .set(`refresh_token`, currentLogin.oAuth.refresh_token)
      .set(`grant_type`, 'refresh_token')
      .set(`client_id`, AppConstants.oaut_client_id)
      .set(`client_secret`, AppConstants.oaut_client_secret);


    return this.http.post<AuthenticationOAutResponse>(`${AppConstants.HealthOAuth_URL}`,
     bodyParams,AppConstants.httpClientOption_form_urlencoded).pipe(
     map(res => {
      
      currentLogin.oAuth = res;
      localStorage.setItem('currentLogin', JSON.stringify({ userName: currentLogin.username, oAuth: res }));
      
      return res;
    })).pipe(catchError(this.commonService.handleError));

    
  }

  login(username: string, password: string): Observable<boolean> {
    return this.http.post('/api/authenticate', JSON.stringify({ username: username, password: password })).pipe(
      map(response => {
        // login successful if there's a jwt token in the response
        //let token = response.json() && response.json().token;

        if (response) {
          // set token property
          this.token = response as string;

          // store username and jwt token in local storage to keep user logged in between page refreshes
          localStorage.setItem('currentUser', JSON.stringify({ username: username, token:  this.token }));

          // return true to indicate successful login
          return true;
        } else {
          // return false to indicate failed login
          return false;
        }
      })).pipe(catchError(this.commonService.handleError));





  }

  logout(): void {
    // clear token remove user from local storage to log user out
    this.token = null;
    localStorage.removeItem('currentLogin');
  }



}
