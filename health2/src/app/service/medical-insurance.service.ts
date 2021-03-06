import { Injectable, Inject } from '@angular/core';
import { PatientBE, MutualPorPacienteBE, PersonBE, MutualBE } from '../model/index';
import { Param, IParam, IContextInformation, IRequest, IResponse, Result } from '../model/common.model';
import { AppConstants, contextInfo } from "../model/common.constants";
// permmite cambiar la variable obsevada
import { Observable } from 'rxjs';
import { map, catchError } from 'rxjs/operators';

import { CommonService } from '../service/common.service';
import { HttpClient } from '@angular/common/http';
import { helperFunctions } from './helperFunctions';

@Injectable()
export class MedicalInsuranceService {

  private contextInfo: IContextInformation;


  constructor(private http: HttpClient, private commonService: CommonService) {

    this.contextInfo = contextInfo;
    this.commonService = commonService;

  }



  retriveAllObraSocialService$(status: string): Observable<any> {

    var bussinesData = {
      Status: status,
      StartDate: new Date()
    };
    let executeReq = this.commonService.generete_post_Params("RetriveAllObraSocialService", bussinesData);
    let outhHeader = this.commonService.get_AuthorizedHeader();
    return this.http.post<any>(`${AppConstants.AppExecuteAPI_URL}`, executeReq, { headers: outhHeader }).pipe(
      map(res =>{
        
        let result :Result= JSON.parse(res.Result) as Result;
        if (result.Error) {
          Observable.throw(result.Error)
        }

        let MutualList: MutualBE[] = result.BusinessData["ObraSocialList"] as MutualBE[];
        return MutualList;

      })).pipe(catchError(helperFunctions.handleError));

  }

  getObraSocialPorPatientService$(status: string, startDate: Date): Observable<any> {

    var bussinesData = {
      Status: status,
      StartDate: startDate
    };
    let outhHeader = this.commonService.get_AuthorizedHeader();
    let executeReq = this.commonService.generete_post_Params("GetObraSocialPorPatientService", bussinesData);
    return this.http.post<any>(`${AppConstants.AppExecuteAPI_URL}`, executeReq, { headers: outhHeader }).pipe(
      map(res =>{
        let result :Result= JSON.parse(res.Result) as Result;
        if (result.Error) {
          this.commonService.handleErrorObservable(result.Error);
        }

        let list: MutualPorPacienteBE[] = result.BusinessData as MutualPorPacienteBE[];

        return list;
      })).pipe(catchError(helperFunctions.handleError));
  }

  updateObraSocialService$(mutualBE: MutualBE): Observable<any> {

    var bussinesData = mutualBE;
    let outhHeader = this.commonService.get_AuthorizedHeader();
    let executeReq = this.commonService.generete_post_Params("UpdateObraSocialService", bussinesData);
    return this.http.post<any>(`${AppConstants.AppExecuteAPI_URL}`, executeReq, { headers: outhHeader }).pipe(
      map(res =>{
        let result :Result= JSON.parse(res.Result) as Result;
        if (result.Error) {
          this.commonService.handleErrorObservable(result.Error);
        }
        return "Ok";
      })).pipe(catchError(this.commonService.handleError));
  }

  createObraSocialService$(mutualBE: MutualBE): Observable<any> {

    var bussinesData = { Mutual: mutualBE };
    let outhHeader = this.commonService.get_AuthorizedHeader();
    let executeReq = this.commonService.generete_post_Params("CreateObraSocialService", bussinesData);
    return this.http.post<any>(`${AppConstants.AppExecuteAPI_URL}`, executeReq, { headers: outhHeader }).pipe(
      map(res =>{
        let result :Result= JSON.parse(res.Result) as Result;
        if (result.Error) {
          this.commonService.handleErrorObservable(result.Error);
        }
        let id: number = result.BusinessData["IdMutual"] as number;
        return id;
      })).pipe(catchError(helperFunctions.handleError));
  }



}
