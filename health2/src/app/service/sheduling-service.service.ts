import { Injectable, Inject } from '@angular/core';
import { ProfesionalBE, PersonBE, ResourceSchedulingBE, HealthInstitution_ProfesionalBE, GetProfesionalRes } from '../model/index';
import { Param, IParam, IContextInformation, IRequest, IResponse, Result, User } from '../model/common.model';
import { HealtConstants, contextInfo } from "../model/common.constants";
import {  Response, RequestOptions, Headers, URLSearchParams } from '@angular/http';

// permmite cambiar la variable obsevada
import { Observable } from 'rxjs';
import { map, catchError } from 'rxjs/operators';
import { CommonService } from '../service/common.service';
import 'rxjs/add/operator/map';
import { Profesional_FullViewBE, ProfesionalesGridBE, AppointmentsBE } from "../model/profesional.model";
import { HttpClient } from '@angular/common/http';

@Injectable()
export class ShedulingServiceService {

  private contextInfo: IContextInformation;
  private commonService: CommonService;

  constructor(private http: HttpClient, @Inject(CommonService) commonService: CommonService) {
    this.contextInfo = contextInfo;
    this.commonService = commonService;
  }

  CreateAppointmentsService$(
    AppointmentsList: AppointmentsBE[]
   ): Observable<any> {

    var bussinesData = {
      AppointmentsList: AppointmentsList
    };

    

    let executeReq=  this.commonService.generete_post_Params("CreateAppointmentsService", bussinesData);
    
    return  this.http.post<Result>(`${HealtConstants.HealthExecuteAPI_URL}`, executeReq,HealtConstants.httpClientOption_contenttype_json).pipe(
       map(result => {

      //  let result: Result = JSON.parse(res.json());

        if (result.Error) {
          throw Observable.throw(result.Error);
        }
        
        return true;
      })).pipe(catchError(this.commonService.handleError));
  }


  GetAppoinmentByParamsService$(
    AppointmentId?: number
   ): Observable<any> {

    var bussinesData = {
      AppointmentId: AppointmentId
    };

    

    let executeReq=  this.commonService.generete_post_Params("GetAppoinmentByParamsService", bussinesData);

    return  this.http.post<Result>(`${HealtConstants.HealthExecuteAPI_URL}`,executeReq,HealtConstants.httpClientOption_contenttype_json).pipe(
       map(result => {

      //  let result: Result = JSON.parse(res.json());

        if (result.Error) {
          throw Observable.throw(result.Error);
        }
        let AppointmentsBE = result.BusinessData['AppointmentsBE'] as AppointmentsBE;
        return AppointmentsBE;
      })).pipe(catchError(this.commonService.handleError));
  }

}

