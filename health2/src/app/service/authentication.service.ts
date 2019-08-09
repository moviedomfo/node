import { Injectable, Inject } from '@angular/core';

import { AppConstants, contextInfo } from "../model/common.constants";
import { Param, IParam, IContextInformation, IRequest, IResponse, Result, AuthenticationOAutResponse, User, CurrentLogin, ApiServerInfo } from '../model/common.model';
import { map, catchError } from 'rxjs/operators';
import { Observable, Subject, throwError } from 'rxjs';
import { Router } from '@angular/router';
import { CommonService } from '../service/common.service';

import { HttpParams, HttpHeaders, HttpClient } from '@angular/common/http';
import * as jwt_decode from "jwt-decode";
import { helperFunctions } from './helperFunctions';
import { ProfesionalFullData } from '../model';

@Injectable()
export class AuthenticationService {
  public logingChange_subject$: Subject<boolean> = new Subject<boolean>();

 
  constructor(private commonService: CommonService, private http: HttpClient, private router: Router) {
    // set token if saved in local storage
  }

  isAuth() {
    
    var currentUser: CurrentLogin = this.getCurrenLoging();
    if (currentUser)
      return true;
    else
      return false;

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
  public oauthToken$(userName: string, password: string, domain: string): Observable<any> {

    var bussinesData = {
      userName: userName,
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
        })).pipe(catchError(helperFunctions.handleError));

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

 

 
  signOut(): void {
    // clear token remove user from local storage to log user out

    localStorage.removeItem('currentLogin');
    this.logingChange_subject$.next(false);
  }

  getCurrenLoging(): CurrentLogin {
    var currentLogin: CurrentLogin = new CurrentLogin();
    let str = localStorage.getItem('currentLogin');
   
    if (currentLogin){
      currentLogin = JSON.parse(str);
   
      return currentLogin;
    }
   else{
     return null;
   }
  }
  
  getCurrenProfesional(): ProfesionalFullData {
    var currentProf: ProfesionalFullData = new ProfesionalFullData();

    if (currentProf){
      let str = localStorage.getItem('currentProfesionalData');
      currentProf = JSON.parse(str);  
      return currentProf;
    }
   else{
     return null;
   }
    
  }

  getServerInfo$(): Observable<ApiServerInfo> {
    var bussinesData = {    };
    var apiURL = AppConstants.AppOAuth_BaseUrl + "getServerInfo";
    let outhHeader = this.commonService.get_AuthorizedHeader();
    return this.http.get<ApiServerInfo>(apiURL,   { headers: outhHeader }).pipe(
      map(res => {
        return res;
      })).pipe(catchError(this.commonService.handleError));
  }


}
