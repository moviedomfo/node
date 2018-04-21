import { Injectable, Inject } from '@angular/core';
import { PatientBE,MutualPorPacienteBE,PersonBE } from '../model/index';
import { Param, IParam, IContextInformation, IRequest, IResponse, Result, ExecuteReq } from '../model/common.model';
import { HealtConstants, contextInfo } from "../model/common.constants";
import {  Response, RequestOptions, Headers, URLSearchParams, RequestOptionsArgs } from '@angular/http';
import { HttpClient, HttpHeaders } from '@angular/common/http';
// permmite cambiar la variable obsevada
import { Subject } from 'rxjs/Subject';
// permite observar
import { Observable } from 'rxjs/Observable';
import { CommonService } from '../service/common.service';
import 'rxjs/add/operator/map';

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


  /// GET to  "http://localhost:63251/api/",
  retrivePatientsSimple$(): Observable<PatientBE[]> {


    //map retorna el mapeo de un json que viene del servicio que tiene la misma estructura que  PatientBE
    return this.http.get(`${HealtConstants.HealthAPI_URL}patients/RetrivePatientsSimple`, HealtConstants.httpClientOption_contenttype_json)
      .map(function (res: Response) {
        return res.json();
      });


  }
  retrivePatientsSimple_post$(): Observable<PatientBE[]> {
    var bussinesData = {
      Id: 123
    };
    let ExecuteReq: ExecuteReq = this.commonService.generete_post_Params("getPatientService", bussinesData);

    return this.http.post(`${HealtConstants.HealthExecuteAPI_URL}`, ExecuteReq, HealtConstants.httpClientOption_contenttype_json).map(function (res: Response) {

      let result: Result = JSON.parse(res.toString());
      console.log(res.toString());
      if (result.Error) {
        throw Observable.throw(result.Error);
      }
     
      let patient: PatientBE = result.BusinessData as PatientBE;

      return patient;
    }).catch(this.commonService.handleError);

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

    return this.http.post(`${HealtConstants.HealthExecuteAPI_URL}`,ExecuteReq, HealtConstants.httpClientOption_contenttype_json)
      .map(function (res: Response) {

        let result: Result= JSON.parse(res.toString());

        if (result.Error) {
          throw  Observable.throw(result.Error);
        }

        let patient: PatientBE = result.BusinessData as PatientBE;

        return patient;
      }).catch(this.commonService.handleError);
  }


  //retrivePatients
  retrivePatients$(txtQuery:string): Observable<PatientBE[]> {

    var bussinesData = {
      nombre: txtQuery,
      apellido: txtQuery,
      nroDocumento:null,
      id:null,
      ReturnGrid:false,
    };

    let executeReq=  this.commonService.generete_post_Params("RetrivePatientsService", bussinesData);
  
    return this.http.post(`${HealtConstants.HealthExecuteAPI_URL}`,executeReq, HealtConstants.httpClientOption_contenttype_json)
      .map(function (res: Response) {

        
        let result: Result = JSON.parse(res.toString());

        if (result.Error) {
          throw  Observable.throw(result.Error);
        }

        let patientlist: PatientBE[] = result.BusinessData["PatientList"] as PatientBE[];
        //let lita :any[]=retrivePatientsRes.BusinessData["PatientList"];
        //patientlist = retrivePatientsRes.BusinessData["PatientList"] as PatientBE[];
        //alert(JSON.stringify(patientlist));

        return patientlist;
      }).catch(
        
        this.commonService.handleError
      );
  }


  createPatientsService$(patient: PatientBE,mutuales: MutualPorPacienteBE[]): Observable<PatientBE>  {
      
    var bussinesData = {
      Patient: patient,
      Mutuales: mutuales
    
    };
    let executeReq=  this.commonService.generete_post_Params("CrearPatientService", bussinesData);
    
    return this.http.post(`${HealtConstants.HealthExecuteAPI_URL}`,executeReq, HealtConstants.httpClientOption_contenttype_json)
    .map(function (res: Response) {

      let result: Result = JSON.parse(res.toString());

      if (result.Error) {
        throw  Observable.throw(result.Error);
      }
      patient.IdPersona =  result.BusinessData["IdPersona"] as number;
      patient.PatientId =  result.BusinessData["PatientId"] as number;

      return patient;
    }).catch(this.commonService.handleError);

  }

  //AnteriorFechaNacimiento Vacunas
  updatePatientsService$(patient: PatientBE, mutuales: MutualPorPacienteBE[], AnteriorFechaNacimiento: Date): Observable<any> {

    var bussinesData = {
      Patient: patient,
      Mutuales: mutuales,
      AnteriorFechaNacimiento: Date

    };

    let executeReq=  this.commonService.generete_post_Params("UpdatePatientService", bussinesData);
    return this.http.post(`${HealtConstants.HealthExecuteAPI_URL}`,executeReq, HealtConstants.httpClientOption_contenttype_json)
      .map(function (res: Response) {

        let result: Result = JSON.parse(res.toString());

        if (result.Error) {
          throw  Observable.throw(result.Error);
          
        }
        return "the patient was updated";
      }).catch(this.commonService.handleError);

  }



  // getPatientById(patintId: number): IPatient {
  //   let patient: IPatient;
  //   patient = this.patientList.filter(p => p.PatientId === patintId)[0];
  //   return patient;
  // }

  getPatientById(patientId: number): Observable<PatientBE> {
      
    var bussinesData = {
      Id: patientId
    };


    let executeReq=  this.commonService.generete_post_Params("GetPatientService", bussinesData);

    
    return this.http.post(`${HealtConstants.HealthExecuteAPI_URL}`,executeReq, HealtConstants.httpClientOption_contenttype_json)
      .map(function (res: Response) {

        let result: Result = JSON.parse(res.toString());
      
        if (result.Error) {
          throw  Observable.throw(result.Error);
        }

        let patient: PatientBE = result.BusinessData["Patient"] as PatientBE;
        
        if(result.BusinessData["Mutuales"]!=null)
          patient.Mutuales = result.BusinessData["Mutuales"] as MutualPorPacienteBE[];


        return patient;
      }).catch(this.commonService.handleError);
   }
}

