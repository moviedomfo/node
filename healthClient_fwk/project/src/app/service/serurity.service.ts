import { Injectable, Inject } from '@angular/core';

import { Param, IParam, IContextInformation, IRequest, IResponse, Result, ExecuteReq, ApiResult, AuthenticationOAutResponse, CurrentLogin } from '../model/common.model';
import { HealtConstants, contextInfo } from "../model/common.constants";

import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
// permmite cambiar la variable obsevada
import { Subject } from 'rxjs';
// permite observar
//import {  Response, RequestOptions, Headers, URLSearchParams, RequestOptionsArgs } from '@angular/common/http';
import { CommonService } from '../service/common.service';
import { map, catchError } from 'rxjs/operators';
import { Observable } from 'rxjs';
import { Alert } from 'selenium-webdriver';

@Injectable({
  providedIn: 'root'
})
export class SerurityService {
  private static _token: any;
  constructor(private http: HttpClient, private commonService: CommonService) {
  
  }

  ///Este método de autenticacion usa jwk contra un rest asp api
  loging2$(userName: string,password:string): Observable<AuthenticationOAutResponse> {

    const bodyParams = new HttpParams()
    .set(`username`, userName)
    .set(`password`, password)
    .set(`grant_type`, 'password')
    .set(`client_id`, HealtConstants.oaut_client_id)
    .set(`securityProviderName`, HealtConstants.oaut_securityProviderName)
    .set(`client_secret`, HealtConstants.oaut_client_secret);

    //let header_httpClient_contentTypeJson = new HttpHeaders({ 'Content-Type': 'application/json' });
    const headers = new HttpHeaders({ 'Content-Type': 'application/json' });
    headers.append('Access-Control-Allow-Headers', 'Content-Type');
    headers.append('Access-Control-Allow-Methods', 'POST');
    headers.append('Access-Control-Allow-Origin', 'http://localhost:5100');
    var h = {headers:headers};


    return this.http.post<AuthenticationOAutResponse>(`${HealtConstants.HealthOAuth_URL}`,
    bodyParams,h).pipe(
     map(res => {
      console.log(res);
       localStorage.setItem('currentLogin', JSON.stringify({ userName: userName, oAuth: res }));
      
       return res;
    })).pipe(catchError(this.commonService.handleError));

  }


///Este método de autenticacion usa jwk contra un rest asp api
loging$(userName: string,password:string): Observable<CurrentLogin> {

  var bussinesData ={
    username:userName,
    password:password,
    grant_type:'password',
    client_id:HealtConstants.oaut_client_id,
    securityProviderName: HealtConstants.oaut_securityProviderName,
    client_secret:HealtConstants.oaut_client_secret
  }
  

  //let header_httpClient_contentTypeJson = new HttpHeaders({ 'Content-Type': 'application/json' });
  const headers = new HttpHeaders({ 'Content-Type': 'application/json' });
  headers.append('Access-Control-Allow-Headers', 'Content-Type');
  headers.append('Access-Control-Allow-Methods', 'POST');
  headers.append('Access-Control-Allow-Origin', 'http://localhost:51000');

  var httpHeader = {headers:headers};


  return this.http.post<any>(`http://localhost:51000/api/account/oauth`,bussinesData,httpHeader).pipe(
   map(res => {

    //console.log(res);

    var currentLogin :CurrentLogin = new  CurrentLogin();
    currentLogin.oAuth = new AuthenticationOAutResponse();
    currentLogin.oAuth.access_token =res;
    //currentLogin.oAuth.access_token = res.access_token;
    currentLogin.username= userName;
    localStorage.setItem('currentLogin', JSON.stringify(currentLogin));
    
     return currentLogin;


  })).pipe(catchError(this.commonService.handleError));

}


}
