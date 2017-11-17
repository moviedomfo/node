import { Injectable, Inject } from '@angular/core';
import { PatientBE,MutualPorPacienteBE,PersonBE } from '../model/index';
import { Param, IParam, IContextInformation, IRequest, IResponse, Result } from '../model/common.model';
import { HealtConstants, contextInfo } from "../model/common.constants";
import { Http, Response, RequestOptions, Headers, URLSearchParams } from '@angular/http';

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
  constructor(private http: Http, @Inject(CommonService) commonService: CommonService) {
    this.contextInfo = contextInfo;
    this.commonService = commonService;
  }


  /// GET to  "http://localhost:63251/api/",
  retrivePatientsSimple$(): Observable<PatientBE[]> {


    //map retorna el mapeo de un json que viene del servicio que tiene la misma estructura que  PatientBE
    return this.http.get(`${HealtConstants.HealthAPI_URL}patients/RetrivePatientsSimple`, HealtConstants.httpOptions)
      .map(function (res: Response) {
        return res.json();
      });


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
    
    let searchParams: URLSearchParams = this.commonService.generete_get_searchParams("getPatientService", bussinesData);
    HealtConstants.httpOptions.search = searchParams;

    return this.http.get(`${HealtConstants.HealthExecuteAPI_URL}`, HealtConstants.httpOptions)
      .map(function (res: Response) {

        let result: Result= JSON.parse(res.json());

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


    let searchParams: URLSearchParams = this.commonService.generete_get_searchParams("RetrivePatientsService", bussinesData);
    
    HealtConstants.httpOptions.search = searchParams;

    //console.log('trying to execute ' + `${HealtConstants.HealthExecuteAPI_URL}`);
    return this.http.get(`${HealtConstants.HealthExecuteAPI_URL}`, HealtConstants.httpOptions)
      .map(function (res: Response) {

        let result: Result = JSON.parse(res.json());

        if (result.Error) {
          throw  Observable.throw(result.Error);
        }

        let patientlist: PatientBE[] = result.BusinessData["PatientList"] as PatientBE[];
        //let lita :any[]=retrivePatientsRes.BusinessData["PatientList"];
        //patientlist = retrivePatientsRes.BusinessData["PatientList"] as PatientBE[];
        //alert(JSON.stringify(patientlist));

        return patientlist;
      }).catch(this.commonService.handleError);
  }


  createPatientsService$(patient: PatientBE,mutuales: MutualPorPacienteBE[]): Observable<PatientBE>  {
      
    var bussinesData = {
      Patient: patient,
      Mutuales: mutuales
    
    };
    HealtConstants.httpOptions.search = this.commonService.generete_get_searchParams("CrearPatientService", bussinesData);;
    return this.http.get(`${HealtConstants.HealthExecuteAPI_URL}`, HealtConstants.httpOptions)
    .map(function (res: Response) {

      let result: Result = JSON.parse(res.json());

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
    HealtConstants.httpOptions.search = this.commonService.generete_get_searchParams("UpdatePatientService", bussinesData);;
    return this.http.get(`${HealtConstants.HealthExecuteAPI_URL}`, HealtConstants.httpOptions)
      .map(function (res: Response) {

        let result: Result = JSON.parse(res.json());

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



    let searchParams: URLSearchParams = this.commonService.generete_get_searchParams("GetPatientService", bussinesData);
    HealtConstants.httpOptions.search = searchParams;
    
    return this.http.get(`${HealtConstants.HealthExecuteAPI_URL}`, HealtConstants.httpOptions)
      .map(function (res: Response) {

        let result: Result = JSON.parse(res.json());
      
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

