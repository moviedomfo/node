import { Injectable, Inject } from '@angular/core';
import { HealtConstants, contextInfo } from "../model/common.constants";
import { Param, IParam, IContextInformation, IRequest, IResponse, Result, AuthenticationOAutResponse } from '../model/common.model';
import { Http, Response, RequestOptions, Headers, URLSearchParams } from '@angular/http';

import { Observable } from 'rxjs/Observable';
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
  public oauthToken(userName: string, password: string): Observable< AuthenticationOAutResponse> {


    const bodyParams = new HttpParams()
      .set(`username`, userName)
      .set(`password`, "password")
      .set(`grant_type`, 'password')
      .set(`client_id`, HealtConstants.oaut_client_id)
      .set(`client_secret`, HealtConstants.oaut_client_secret);

    return this.http.post<AuthenticationOAutResponse>(`${HealtConstants.HealthOAuth_URL}`,
     bodyParams,HealtConstants.httpClientOption).map((res) => {
      return res;
    }).catch(this.commonService.handleError);

    
  }



  login(username: string, password: string): Observable<boolean> {
    return this.http.post('/api/authenticate', JSON.stringify({ username: username, password: password }))
      .map((response: Response) => {
        // login successful if there's a jwt token in the response
        let token = response.json() && response.json().token;
        if (token) {
          // set token property
          this.token = token;

          // store username and jwt token in local storage to keep user logged in between page refreshes
          localStorage.setItem('currentUser', JSON.stringify({ username: username, token: token }));

          // return true to indicate successful login
          return true;
        } else {
          // return false to indicate failed login
          return false;
        }
      });




  }

  logout(): void {
    // clear token remove user from local storage to log user out
    this.token = null;
    localStorage.removeItem('currentUser');
  }



}
