import { Injectable, Inject } from '@angular/core';

import { Param, IParam, IContextInformation, IRequest, IResponse, Result, ExecuteReq, ApiResult, AuthenticationOAutResponse } from '../model/common.model';
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
  loging$(userName: string,password:string): Observable<AuthenticationOAutResponse> {

    const bodyParams = new HttpParams()
    .set(`username`, userName)
    .set(`password`, password)
    .set(`grant_type`, 'password')
    .set(`client_id`, HealtConstants.oaut_client_id)
    .set(`securityProviderName`, HealtConstants.oaut_securityProviderName)
    .set(`client_secret`, HealtConstants.oaut_client_secret);

    return this.http.post<AuthenticationOAutResponse>(`${HealtConstants.HealthOAuth_URL}`,
    bodyParams,HealtConstants.httpClientOption_form_urlencoded).pipe(
     map(res => {

     localStorage.setItem('currentLogin', JSON.stringify({ userName: userName, oAuth: res }));

     return res;
    })).pipe(catchError(this.commonService.handleError));

      //   return this.http.post(`${HealtConstants.HealthExecuteAPI_URL}`,ExecuteReq, HealtConstants.httpClientOption_contenttype_json).pipe(
      //     map(res => {

            
      //       let result: Result= JSON.parse(res.toString());

      //       if (result.Error) {
      //         throw  Observable.throw(result.Error);
      //       }

      //       //let patient: PatientBE = result.BusinessData as PatientBE;

      //       return patient;
      //       })) .pipe( catchError(this.commonService.handleError));
      // }
  }




}
