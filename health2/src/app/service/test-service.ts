import { Injectable, Inject } from '@angular/core';
import { Observable, pipe } from 'rxjs';
import { map, catchError } from 'rxjs/operators';
import {PersonBE} from '../../app/model/persons.model'
import { AppConstants, contextInfo } from "../model/common.constants";
import { Param, IParam, IContextInformation, IRequest, IResponse, Result, User, Rol, ExecuteReq, CurrentLogin } from '../model/common.model';
import { CommonService } from '../service/common.service';
import { HttpClient, HttpHeaders } from '@angular/common/http';


@Injectable()
export class TestService {

  constructor(private http: HttpClient,private commonService: CommonService) { }



  public execute(){

    let currentLogin:CurrentLogin = JSON.parse( localStorage.getItem('currentLogin') );
    var bussinesData = {
      Id: 123
    };
    let ExecuteReq: ExecuteReq = this.commonService.generete_post_Params("getPatientService", bussinesData);
    //console.log(JSON.stringify(params));
    let url ='http://localhost:63251/api/test/execute/';
    
     let headders = this.commonService.get_AuthorizedHeader();
    
    console.log(currentLogin.oAuth.access_token);

    
    return this.http.post<Result>(url,ExecuteReq,{headers:headders} ).pipe(
     map(result => {

      

      if (result.Error) {
        console.log(result.Error);
        throw Observable.throw(result.Error);
      }
      console.log(result);
      return result;
      
    })).pipe(catchError(this.commonService.handleError));
  }
}


