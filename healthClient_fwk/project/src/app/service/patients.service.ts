import { Injectable, Inject } from '@angular/core';
import { PatientBE,MutualPorPacienteBE,PersonBE } from '../model/index';
import { Param, IParam, IContextInformation, IRequest, IResponse, Result, ExecuteReq, ApiResult, CurrentLogin } from '../model/common.model';
import { HealtConstants, contextInfo } from "../model/common.constants";

import { HttpClient, HttpHeaders } from '@angular/common/http';
// permmite cambiar la variable obsevada
import { Subject } from 'rxjs';
// permite observar
//import {  Response, RequestOptions, Headers, URLSearchParams, RequestOptionsArgs } from '@angular/common/http';
import { CommonService } from '../service/common.service';
import { map, catchError } from 'rxjs/operators';
import { Observable } from 'rxjs';
import { Alert } from 'selenium-webdriver';


@Injectable()
export class PatientsService {

  private static _token: any;
 
  private patientList: PatientBE[] = [];
  private patientList$: Subject<PatientBE[]> = new Subject<PatientBE[]>();

  public paramList: Param[];
  private patient: PatientBE;
  private contextInfo: IContextInformation;
  private commonService: CommonService;
  
  constructor(private http: HttpClient, @Inject(CommonService) commonService: CommonService) {
    this.contextInfo = contextInfo;
    this.commonService = commonService;
  }


  
 
    
   

  

  //Request header field Access-Control-Allow-Origin is not allowed by 
  //Access-Control-Allow-Headers in preflight response.
  reriveAllPatientList$(): Observable<PatientBE[]> {
    return this.patientList$.asObservable();
  }


 
  getPatientService$(id: number): Observable<PatientBE> {
    var bussinesData = {
      Id: id
    };

    let ExecuteReq=  this.commonService.generete_post_Params("getPatientService", bussinesData);
    //HealtConstants.httpOptions.search = searchParams;
    
   
    return this.http.post(`${HealtConstants.HealthExecuteAPI_URL}`,ExecuteReq, HealtConstants.httpClientOption_contenttype_json).pipe(
      map(res => {

        
        let result: Result= JSON.parse(res.toString());

        if (result.Error) {
          throw  Observable.throw(result.Error);
        }

        let patient: PatientBE = result.BusinessData as PatientBE;

        return patient;
        })) .pipe( catchError(this.commonService.handleError));
  }


  //retrivePatients
  retrivePatients$(txtQuery:string,pageIndex:number,pageSize:number): Observable<PatientBE[]> {

    var bussinesData = {
      nombre: txtQuery,
      apellido: txtQuery,
      nroDocumento:null,
      id:null,
      ReturnGrid:false,
      pageIndex:pageIndex,
      pageSize:pageSize,
    };

   
    let executeReq=  this.commonService.generete_post_Params("RetrivePatientsService", bussinesData);
    let header_httpClient = this.commonService.get_AuthorizedHeader();
    
    return this.http.post(`${HealtConstants.HealthExecuteAPI_URL}`,executeReq,  {headers : header_httpClient}).pipe(
      map(function (res: ApiResult) {


        let result= JSON.parse(res.Result.toString());
        if (result.Error) {
          throw  Observable.throw(result.Result.Error);
        }

        let patientlist: PatientBE[] = result.BusinessData["PatientList"] as PatientBE[];
     

        return patientlist;
      })) .pipe( catchError(this.commonService.handleError));
  }


  createPatientsService$(patient: PatientBE,mutuales: MutualPorPacienteBE[]): Observable<PatientBE>  {
      
    var bussinesData = {
      Patient: patient,
      Mutuales: mutuales
    
    };
    let executeReq=  this.commonService.generete_post_Params("CrearPatientService", bussinesData);
    
    return this.http.post(`${HealtConstants.HealthExecuteAPI_URL}`,executeReq, HealtConstants.httpClientOption_contenttype_json).pipe(
    map(function (res: ApiResult) {

      let result= JSON.parse(res.Result.toString());

      if (result.Error) {
        throw  Observable.throw(result.Error);
      }
      patient.IdPersona =  result.BusinessData["IdPersona"] as number;
      patient.PatientId =  result.BusinessData["PatientId"] as number;

      return patient;
      })).pipe( catchError(this.commonService.handleError));

  }

  
  updatePatientsService$(patient: PatientBE, mutuales: MutualPorPacienteBE[], AnteriorFechaNacimiento: Date): Observable<any> {

    var bussinesData = {
      Patient: patient,
      Mutuales: mutuales,
      AnteriorFechaNacimiento: Date

    };

    let executeReq=  this.commonService.generete_post_Params("UpdatePatientService", bussinesData);
    return this.http.post(`${HealtConstants.HealthExecuteAPI_URL}`,executeReq, HealtConstants.httpClientOption_contenttype_json).pipe(
      map(function (res: ApiResult) {
        let result= JSON.parse(res.Result.toString());

        if (result.Error) {
          throw  Observable.throw(result.Error);
        }

        return "the patient was updated";
      })) .pipe( catchError(this.commonService.handleError));

  }



  getPatientById(patientId: number): Observable<PatientBE> {
      
    var bussinesData = {
      Id: patientId
    };


    let executeReq=  this.commonService.generete_post_Params("GetPatientService", bussinesData);

    
    return this.http.post(`${HealtConstants.HealthExecuteAPI_URL}`,executeReq, HealtConstants.httpClientOption_contenttype_json).pipe(
      map(function (res: ApiResult) {

        let result= JSON.parse(res.Result.toString());
      
        if (result.Error) {
          throw  Observable.throw(result.Error);
        }

        let patient: PatientBE = result.BusinessData["Patient"] as PatientBE;
        
        if(result.BusinessData["Mutuales"]!=null)
          patient.Mutuales = result.BusinessData["Mutuales"] as MutualPorPacienteBE[];


        return patient;
      })).pipe( catchError(this.commonService.handleError));
   }
}

