import { Injectable, Inject } from '@angular/core';
import { AppConstants, contextInfo } from "../model/common.constants";
import { Param, IParam, IContextInformation, IRequest, IResponse, Result, AuthenticationOAutResponse, User, CurrentLogin } from '../model/common.model';
import { map, catchError } from 'rxjs/operators';
import { Observable, Subject, throwError } from 'rxjs';
import { Router } from '@angular/router';
import { CommonService } from '../service/common.service';
import 'rxjs/add/operator/map';
import { HttpParams, HttpHeaders, HttpClient } from '@angular/common/http';
import * as jwt_decode from "jwt-decode";

@Injectable()
export class AuthenticationService {
  public logingChange_subject$: Subject<boolean> = new Subject<boolean>();

  public token: string;
  constructor(private commonService: CommonService, private http: HttpClient, private router: Router) {
    // set token if saved in local storage
    var currentUser = JSON.parse(localStorage.getItem('currentUser'));
    this.token = currentUser && currentUser.token;

  }

  get_logingChange$(): Observable<boolean> {
    return this.logingChange_subject$.asObservable();
  }
  //Este método de autenticacion usa jwk contra un rest asp api
  public oauthToken_owin$(userName: string, password: string): Observable<CurrentLogin> {

    const bodyParams = new HttpParams()
      .set(`username`, userName)
      .set(`password`, password)
      .set(`grant_type`, 'password')
      .set(`client_id`, AppConstants.oaut_client_id)
      .set(`securityProviderName`, AppConstants.oaut_securityProviderName)
      .set(`client_secret`, AppConstants.oaut_client_secret);


    return this.http.post<string>(`${AppConstants.AppOAuth_URL}`,
      bodyParams, AppConstants.httpClientOption_form_urlencoded).pipe(
        map(res => {
          alert(AppConstants.AppOAuth_URL);

          var currentLogin: CurrentLogin = new CurrentLogin();
          currentLogin.oAuth = new AuthenticationOAutResponse();
          currentLogin.oAuth.access_token = res;
          let tokenInfo = jwt_decode(currentLogin.oAuth.access_token); // decode token


          currentLogin.currentUser = new User();
          currentLogin.currentUser.UserId = tokenInfo.userId;
          currentLogin.currentUser.UserName = tokenInfo.userName;
          currentLogin.currentUser.Email = tokenInfo.email;
          currentLogin.currentUser.Roles = tokenInfo.roles;
          //currentLogin.currentUser.ProfesionalName = tokenInfo.unique_name;
          localStorage.setItem('currentLogin', JSON.stringify(currentLogin));

          return currentLogin;
        })).pipe(catchError(this.commonService.handleError2));

  }
  ///Este método de autenticacion usa jwk contra un rest asp api
  oauthToken$(userName: string, password: string, domain: string): Observable<any> {

    var bussinesData = {
      username: userName,
      password: password,
      domain: domain,
      grant_type: 'password',
      client_id: AppConstants.oaut_client_id,
      securityProviderName: AppConstants.oaut_securityProviderName,
      client_secret: AppConstants.oaut_client_secret
    }
    return this.http.post<any>(AppConstants.AppOAuth_URL,
      bussinesData, AppConstants.httpClientOption_contenttype_json).pipe(
        map(res => {

          let currentLogin: CurrentLogin = new CurrentLogin();
          currentLogin.oAuth = new AuthenticationOAutResponse();
          currentLogin.oAuth.access_token = res;
          let tokenInfo = jwt_decode(currentLogin.oAuth.access_token); // decode token


          currentLogin.currentUser = new User();
          currentLogin.currentUser.UserId = tokenInfo.userId;
          currentLogin.currentUser.UserName = tokenInfo.userName;
          currentLogin.currentUser.Email = tokenInfo.email;
          currentLogin.currentUser.Roles = tokenInfo.roles;
          //currentLogin.currentUser.ProfesionalName = tokenInfo.unique_name;
          localStorage.setItem('currentLogin', JSON.stringify(currentLogin));
          this.logingChange_subject$.next(true);
          return currentLogin;
        })).pipe(catchError(this.commonService.handleError));

  }

  public refreshoauthToken(): Observable<AuthenticationOAutResponse> {

    let currentLogin: CurrentLogin = JSON.parse(localStorage.getItem('currentLogin'));

    //console.log(currentLogin.oAuth.refresh_token);
    const bodyParams = new HttpParams()
      .set(`refresh_token`, currentLogin.oAuth.refresh_token)
      .set(`grant_type`, 'refresh_token')
      .set(`client_id`, AppConstants.oaut_client_id)
      .set(`client_secret`, AppConstants.oaut_client_secret);


    return this.http.post<AuthenticationOAutResponse>(`${AppConstants.AppOAuth_URL}`,
      bodyParams, AppConstants.httpClientOption_form_urlencoded).pipe(
        map(res => {
          var currentLogin: CurrentLogin = new CurrentLogin();
          currentLogin.oAuth = new AuthenticationOAutResponse();
          currentLogin.oAuth = res;
          currentLogin.currentUser = new User();

          let tokenInfo = jwt_decode(currentLogin.oAuth.access_token); // decode token

          localStorage.setItem('currentLogin', JSON.stringify({ userName: currentLogin.currentUser.UserName, oAuth: res }));
          this.logingChange_subject$.next(true);
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
          localStorage.setItem('currentUser', JSON.stringify({ username: username, token: this.token }));

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
