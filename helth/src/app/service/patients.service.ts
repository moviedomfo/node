import { Injectable, Inject } from '@angular/core';
import { PatientBE } from '../model/patients.model';
import { Param, IParam, IContextInformation, IRequest, IResponse, Result } from '../model/common.model';
import { HealtConstants, contextInfo } from "../model/common.constants";
import { Http, Response, RequestOptions, Headers, URLSearchParams } from '@angular/http';
import { PersonBE } from '../model/persons.model';
//permmite cambiar la variable obsevada
import { Subject } from 'rxjs/Subject';
//permite observar
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
          this.commonService.handleErrorService(result.Error.Message);
        }

        let patient: PatientBE = result.BusinessData as PatientBE;

        return patient;
      });
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
          this.commonService.handleErrorService(result.Error.Message);
        }

        let patientlist: PatientBE[] = result.BusinessData["PatientList"] as PatientBE[];
        //let lita :any[]=retrivePatientsRes.BusinessData["PatientList"];
        //patientlist = retrivePatientsRes.BusinessData["PatientList"] as PatientBE[];
        //alert(JSON.stringify(patientlist));

        return patientlist;
      });
  }


  createPatients(patient: PatientBE) {

    //Clona Patients por parametro
    //var patientClone: IPatient = Object.assign({}, patient);
    var patientClone: PatientBE = Object.assign({}, patient);
    this.patientList.push(patientClone);
    //esto es lo siguiente q envio o notifico. lo que le envio es algo q coincida con la declaracion
    //Subject<IPatients[]>
    //Emito un evento.
    this.patientList$.next(this.patientList);


  }

  


  // getPatientById(patintId: number): IPatient {
  //   let patient: IPatient;
  //   patient = this.patientList.filter(p => p.PatientId === patintId)[0];
  //   return patient;
  // }

  getPatientById(patientId: number): Observable<PatientBE> {
      
    var bussinesData = {
      id: patientId
    };



    let searchParams: URLSearchParams = this.commonService.generete_get_searchParams("GetPatientService", bussinesData);
    HealtConstants.httpOptions.search = searchParams;
    
    return this.http.get(`${HealtConstants.HealthExecuteAPI_URL}`, HealtConstants.httpOptions)
      .map(function (res: Response) {

        let result: Result = JSON.parse(res.json());
      
        if (result.Error) {
          this.commonService.handleErrorService(result.Error.Message);
        }

        let patient: PatientBE = result.BusinessData["Patient"] as PatientBE;



        return patient;
      });
   }
}

