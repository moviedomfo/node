
import { Param, IParam, IContextInformation, IRequest, IResponse, Result, ExecuteReq, HealthInstitutionBE } from '../model/common.model';
import { AppConstants, contextInfo } from "../model/common.constants";
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Subject, throwError, Observable } from 'rxjs';
import { map, catchError } from 'rxjs/operators';
import { CommonService } from './common.service';
import { Injectable, Inject } from '@angular/core';

@Injectable()
export class InstitutionService {

  constructor(private http: HttpClient, private commonService: CommonService) {
  
  }
  //retrivePatients
 retriveHealthInstitution$(): Observable<any> {

    var bussinesData = {
      TextToSearch: '',
      ProfesionalId: null
    
    };
    let outhHeader = this.commonService.get_AuthorizedHeader();
    let executeReq=  this.commonService.generete_post_Params("RetriveHealthInstitutionService", bussinesData);
  
    return  this.http.post<any>(`${AppConstants.AppExecuteAPI_URL}`,executeReq,{ headers: outhHeader }).pipe(
       map(res => {

        let result :Result= JSON.parse(res.Result) as Result;
        if (result.Error) {
          throw  Observable.throw(result.Error);
        }

        let list: HealthInstitutionBE[] = result.BusinessData as HealthInstitutionBE[];
       return list;
      })).pipe(catchError(this.commonService.handleError));
  }


}

