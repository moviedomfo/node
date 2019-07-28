import { Injectable, Inject } from '@angular/core';
import { PatientBE,MutualPorPacienteBE,PersonBE } from '../model/index';
import { Param, IParam, IContextInformation, IRequest, IResponse, Result, ExecuteReq } from '../model/common.model';
import { AppConstants, contextInfo } from "../model/common.constants";
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Subject, throwError, Observable } from 'rxjs';
import { map, catchError } from 'rxjs/operators';
import { CommonService } from '../service/common.service';
import 'rxjs/add/operator/map';
import { helperFunctions } from './helperFunctions';

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
  retrivePatientsSimple$(): Observable<any> {

    let outhHeader = this.commonService.get_AuthorizedHeader();
    //map retorna el mapeo de un json que viene del servicio que tiene la misma estructura que  PatientBE
    return this.http.get<Result>(`${AppConstants.AppAPI_URL}patients/RetrivePatientsSimple`,{ headers: outhHeader }).pipe(
       map(result => {
        return result;
      })).pipe(catchError(this.commonService.handleError));

  }

  retrivePatientsSimple_post$(): Observable<any> {
    var bussinesData = {      Id: 123   };

    let outhHeader = this.commonService.get_AuthorizedHeader();
    let ExecuteReq: ExecuteReq = this.commonService.generete_post_Params("getPatientService", bussinesData);

    return  this.http.post<any>(`${AppConstants.AppExecuteAPI_URL}`, ExecuteReq,{ headers: outhHeader }).pipe(
      map(res => {
        let result :Result= JSON.parse(res.Result) as Result;
      
      if (result.Error) {
        throw Observable.throw(result.Error);
      }
     
      let patient: PatientBE[] = result.BusinessData as PatientBE[];

      return patient;
   })).pipe(catchError(this.commonService.handleError));

  }

  //Request header field Access-Control-Allow-Origin is not allowed by 
  //Access-Control-Allow-Headers in preflight response.
  reriveAllPatientList$(): Observable<PatientBE[]> {
    return this.patientList$.asObservable();
  }


 
  getPatientService$(id: number): Observable<any> {
    var bussinesData = {
      Id: id
    };
    let outhHeader = this.commonService.get_AuthorizedHeader();
    let ExecuteReq=  this.commonService.generete_post_Params("getPatientService", bussinesData);
    //AppConstants.httpOptions.search = searchParams;

    return  this.http.post<any>(`${AppConstants.AppExecuteAPI_URL}`,ExecuteReq,{ headers: outhHeader }).pipe(
       map(res => {

       
       let result :Result= JSON.parse(res.Result) as Result;
        if (result.Error) {
          throw  Observable.throw(result.Error);
        }

        let patient: PatientBE = result.BusinessData as PatientBE;

        return patient;
     })).pipe(catchError(this.commonService.handleError));
  }


  //retrivePatients
  retrivePatients$(txtQuery:string): Observable<any> {

    var bussinesData = {
      nombre: txtQuery,
      apellido: txtQuery,
      nroDocumento:null,
      id:null,
      ReturnGrid:false,
    };
    let outhHeader = this.commonService.get_AuthorizedHeader();
    let executeReq=  this.commonService.generete_post_Params("RetrivePatientsService", bussinesData);
  
    return  this.http.post<any>(`${AppConstants.AppExecuteAPI_URL}`,executeReq,{ headers: outhHeader }).pipe(
       map(res => {

        let result :Result= JSON.parse(res.Result) as Result;
        if (result.Error) {
          throw  Observable.throw(result.Error);
        }

        let patientlist: PatientBE[] = result.BusinessData["PatientList"] as PatientBE[];
        //let lita :any[]=retrivePatientsRes.BusinessData["PatientList"];
        //patientlist = retrivePatientsRes.BusinessData["PatientList"] as PatientBE[];
        //alert(JSON.stringify(patientlist));

        return patientlist;
      })).pipe(catchError(this.commonService.handleError));
  }


  createPatientsService$(patient: PatientBE,mutuales: MutualPorPacienteBE[]): Observable<any>  {
      
    var bussinesData = {
      Patient: patient,
      Mutuales: mutuales
    
    };
    let outhHeader = this.commonService.get_AuthorizedHeader();
    let executeReq=  this.commonService.generete_post_Params("CrearPatientService", bussinesData);
    
    return this.http.post<any>(`${AppConstants.AppExecuteAPI_URL}`,executeReq,{ headers: outhHeader }).pipe(
     map(res => {
      let result :Result= JSON.parse(res.Result) as Result;
      if (result.Error) {
        throw  Observable.throw(result.Error);
      }
      patient.IdPersona =  result.BusinessData["IdPersona"] as number;
      patient.PatientId =  result.BusinessData["PatientId"] as number;

      return patient;
   })).pipe(catchError(this.commonService.handleError));

  }

  //AnteriorFechaNacimiento Vacunas
  updatePatientsService$(patient: PatientBE, mutuales: MutualPorPacienteBE[], AnteriorFechaNacimiento: Date): Observable<any> {

    var bussinesData = {
      Patient: patient,
      Mutuales: mutuales,
      AnteriorFechaNacimiento: Date

    };
    let outhHeader = this.commonService.get_AuthorizedHeader();
    let executeReq=  this.commonService.generete_post_Params("UpdatePatientService", bussinesData);
    return  this.http.post<any>(`${AppConstants.AppExecuteAPI_URL}`,executeReq,{ headers: outhHeader }).pipe(
       map(res => {

        let result :Result= JSON.parse(res.Result) as Result;

        if (result.Error) {
          throw  Observable.throw(result.Error);
          
        }
        return "the patient was updated";
     })).pipe(catchError(helperFunctions.handleError));

  }



  // getPatientById(patintId: number): IPatient {
  //   let patient: IPatient;
  //   patient = this.patientList.filter(p => p.PatientId === patintId)[0];
  //   return patient;
  // }

  getPatientById(patientId: number): Observable<any> {
      
    var bussinesData = {
      Id: patientId
    };

    let outhHeader = this.commonService.get_AuthorizedHeader();
    let executeReq=  this.commonService.generete_post_Params("GetPatientService", bussinesData);
    return  this.http.post<any>(`${AppConstants.AppExecuteAPI_URL}`,executeReq,{ headers: outhHeader }).pipe(
       map(res => {

        let result :Result= JSON.parse(res.Result) as Result;
        if (result.Error) {
          throw  Observable.throw(result.Error);
        }

        let patient: PatientBE = result.BusinessData["Patient"] as PatientBE;
        
        if(result.BusinessData["Mutuales"]!=null)
          patient.Mutuales = result.BusinessData["Mutuales"] as MutualPorPacienteBE[];


        return patient;
     })).pipe(catchError(this.commonService.handleError));
   }
}

