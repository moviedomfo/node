import { Injectable } from '@angular/core';
import { AppConstants, contextInfo, CommonParams } from "../model/common.constants";
import { Param, IParam, IContextInformation, ContextInformation, ExecuteReq, Request, IRequest, IResponse, Result, ServiceError, CurrentLogin, IpInfo } from '../model/common.model';

// permmite cambiar la variable obsevada
import { Observable, Subject, throwError } from 'rxjs';
import { map, catchError } from 'rxjs/operators';
//import { element } from 'protractor';
import { Router } from '@angular/router'
import { HttpHeaders, HttpClient, HttpErrorResponse } from '@angular/common/http';
import { helperFunctions } from './helperFunctions';

//var colors = require('colors/safe');
@Injectable()
export class CommonService {
  public paramList: Param[] = [];
  public paramList$: Subject<Param[]> = new Subject<Param[]>();

  public mainComponentTitle_subject$: Subject<string> = new Subject<string>();
  public ipinfo: IpInfo;
  
  constructor(private http: HttpClient, private router: Router) {
  
    this.ipinfo = new IpInfo();
    this.get_host_ipInfo().subscribe(res => {
      this.ipinfo = res;
     
    });
   }

  //permite subscripcion añl Subject con el titulo
  get_mainComponentTitle$(): Observable<string> {
    return this.mainComponentTitle_subject$.asObservable();
  }
  //permite q un componente cualquiera emita cambio de titulo y este altere el header del dasboard
  Set_mainComponentTitle(tittle: string) {

    this.mainComponentTitle_subject$.next(tittle);
  }
  get_host(): string {

    return  "Ip: " + this.ipinfo.ip + ", city: " +  this.ipinfo.city + ", region :" +  this.ipinfo.region + ", country :" + this.ipinfo.country;
  }

      /**
  * utiliza una api paara retornar informacion hacerca del host cliente
  * @param 
  * @returns json con ip,country de la clase ipinfo
  */
 
  get_host_ipInfo(): Observable<IpInfo> {

    return this.http.get<IpInfo>('http://ipinfo.io?token=21ea63fe5267b3').pipe(
      map(function (res) {
        return res;
      })).pipe(catchError(this.handleError));
  }

  // serarPlaces_google_place_api(input: string) {
  //   //console.log('Ejecutando serarPlaces_google_place_api()');
  //   var api_url = 'https://maps.googleapis.com/maps/api/place/autocomplete/json?input=[input]&types=geocode&key=AIzaSyAEBn6XjDRlouhZP-nQHSU4equHUeR2wEc';

  //   api_url = api_url.replace('[input]', input);
  //   api_url = api_url.replace('[input]', input);

  //   return this.http.get(`${api_url}`,AppConstants.httpClientOption_contenttype_json).pipe(
  //      map(result => {
  //       //console.log(JSON.stringify(places));
  //       //let places = JSON.parse(result.json());
  //       let places = result;
  //     }));
  // }
  
  /**
   * @idTipoParametro : Nombre de tabla
   * @idParametroRef : Subnombre , subcategoria
   */
  searchParametroByParams$(idTipoParametro: number, idParametroRef: number): Observable<any> {

    var bussinesData = {
      IdParametroRef: idParametroRef,
      IdTipoParametro: idTipoParametro,
      Vigente: true
    };


    let executeReq = this.generete_post_Params("SearchParametroByParamsService", bussinesData);
    return this.http.post<Result>(`${AppConstants.AppExecuteAPI_URL}`, executeReq, AppConstants.httpClientOption_contenttype_json).pipe(
      map(result => {


        if (result.Error) {

          throw Observable.throw(result.Error);
        }

        let params: Param[] = result.BusinessData as Param[];

        return params;
      })).pipe(catchError(this.handleError));
  }
  
  /**
  * @params : parametros 
  * @parameterToAppend : CommonParam.Id
  */
  appendExtraParamsCombo(params: Param[], parameterToAppend: number): Param[] {


    var p: Param = new Param();


    switch (parameterToAppend) {
      case CommonParams.SeleccioneUnaOpcion.IdParametro:
        {
          p.Nombre = CommonParams.SeleccioneUnaOpcion.Nombre;
          p.IdParametro = CommonParams.SeleccioneUnaOpcion.IdParametro;
          break;
        }
      case CommonParams.Ninguno.IdParametro:
        {
          p.Nombre = CommonParams.Ninguno.Nombre;
          p.IdParametro = CommonParams.Ninguno.IdParametro;
          break;
        }
      case CommonParams.TodosComboBoxValue.IdParametro:
        {
          p.Nombre = CommonParams.TodosComboBoxValue.Nombre;
          p.IdParametro = CommonParams.TodosComboBoxValue.IdParametro;
          break;
        }
      case CommonParams.VariosComboBoxValue.IdParametro:
        {
          p.Nombre = CommonParams.VariosComboBoxValue.Nombre;
          p.IdParametro = CommonParams.VariosComboBoxValue.IdParametro;
          break;
        }

    }
    params.push(p);

    return params;

  }

  //Metodo directo sin observable
  getById(parentId: number): Param {
    let param: Param;
    param = this.paramList.filter(p => p.IdParametroRef === parentId)[0];
    return param;
  }

  // retornra el objeto Request de un URLSearchParams: Este contiene las siguientes clases
  //  SecurityProviderName?: string;
  // Encrypt?: boolean;
  // Error?:object;
  // ServiceName?: string;
  // BusinessData?:object;
  // CacheSettings?:object;
  // ContextInformation:ContextInformation;
  retrive_Request(searchParams: URLSearchParams) {

    let REQ: Request = JSON.parse(searchParams.get("jsonRequest")) as Request;
    //alert(JSON.stringify(context));
    return REQ;
  }


  generete_get_searchParams(serviceName, bussinesData): URLSearchParams {
    let searchParams: URLSearchParams = new URLSearchParams();
    var req = this.createFwk_SOA_REQ(bussinesData);
    req.ServiceName = serviceName;

    searchParams.set("serviceProviderName", "health");//defaul 
    searchParams.set("serviceName", serviceName);
    searchParams.set("jsonRequest", JSON.stringify(req));

    // console.log("-------------"+serviceName+"------------------");
    // console.log(JSON.stringify(JSON.stringify(req)));
    // console.log("-------------"+serviceName+"------------------");

    return searchParams;
  }


  generete_post_Params(serviceName, bussinesData): ExecuteReq {
    var req = this.createFwk_SOA_REQ(bussinesData);
    var executeReq: ExecuteReq = new ExecuteReq();

    executeReq.serviceProviderName = 'health';
    executeReq.serviceName = serviceName;
    executeReq.jsonRequest = JSON.stringify(req);

    return executeReq;
  }



  createFwk_SOA_REQ(bussinesData: any): Request {
    let contextInfo: ContextInformation = new ContextInformation();
    let req: Request = new Request();
    let currentLogin: CurrentLogin = JSON.parse(localStorage.getItem('currentLogin'));
    contextInfo.Culture = "ES-AR";
    contextInfo.ProviderNameWithCultureInfo = "";
    contextInfo.HostName = 'localhost';
    contextInfo.HostIp = this.ipinfo.ip;
    contextInfo.HostTime = new Date(),
      contextInfo.ServerName = 'WebAPIDispatcherClienteWeb';
    contextInfo.ServerTime = new Date();

    if (currentLogin.currentUser.UserName) { contextInfo.UserName = currentLogin.currentUser.UserName; }
    else { contextInfo.UserName = 'moviedo'; }

    contextInfo.UserId = '';
    contextInfo.AppId = 'Health';
    contextInfo.ProviderName = 'health';
    req.ContextInformation = contextInfo;
    req.BusinessData = bussinesData;
    req.Error = null;
    req.SecurityProviderName = "";
    req.Encrypt = false;

    return req;
  }

  //Retorna un HttpHeaders con CORS y 'Authorization': "Bearer + TOKEN"
  public get_AuthorizedHeader(): HttpHeaders {
    let currentLogin: CurrentLogin = JSON.parse(localStorage.getItem('currentLogin'));
    let headers = new HttpHeaders({ 'Authorization': "Bearer " + currentLogin.oAuth.access_token });
    headers.append('Access-Control-Allow-Methods', '*');
    headers.append('Access-Control-Allow-Headers', 'Content-Type, Access-Control-Allow-Headers, Authorization, X-Requested-With');
    headers.append('Access-Control-Allow-Origin', '*');
    return headers;
  }

  public handleErrorService(serviceError: ServiceError) {
    if (serviceError) {
      alert("Se encontraron errores " + serviceError.Message);
    }
  }
  public handleError2(httpError :any) {
    let errorMessage = '';
    if (httpError.error instanceof ErrorEvent) {
      // client-side error
      errorMessage = `Error: ${httpError.error.message}`;
    } 
    
    if (httpError.error instanceof ProgressEvent) {
      
      console.log(httpError.message);
    }

    return throwError(errorMessage);
  }
  ///Error inspection, interpretation, and resolution is something you want to do in the service, not in the component.
  public handleError(httpError: HttpErrorResponse | any) {
    console.log(httpError);
   
    let ex: ServiceError = new ServiceError();
    ex.Machine = 'PC-Desarrollo';
    // A client-side or network error occurred. Handle it accordingly.
    if (httpError.error instanceof ProgressEvent) {
      ex.Message = 'Client-side error occurred : ' + ex.Message  ; 


      if (ex.Message.includes('api/oauth/authenticate')) {
        ex.Message = ex.Message + ' Can not authenticate ';
      }
      if (httpError.status == 0) {
        ex.Message = ex.Message + ' verify your lan or internet connection.';
      }
      ex.Message = ex.Message + "\r\n" + httpError.message;
      ex.Status = httpError.status;
      return throwError(ex);
    }

    // The backend returned an unsuccessful response code.
    // The response body may contain clues as to what went wrong,
    if (httpError instanceof HttpErrorResponse) {
      //alert(error.error);
      ex.Status = httpError.status;

      if (httpError.error) {
        ex.Type =  httpError.error.ExceptionType || httpError.error.exceptionType;
        if(ex.Type){
          ex.Message  = httpError.error.ExceptionMessage || httpError.error.exceptionMessage;
          if (httpError.error.InnerException) {
            ex.Message = ex.Message + "\r\n" + httpError.error.ExceptionMessage || httpError.error.InnerException.exceptionMessage;
          }
        }
        else{
          ex.Message = httpError.error;
        }
        
        if(helperFunctions.string_IsNullOrEmpty(ex.Message)==false)
            return throwError(ex);
        //ex.Message  =  this.getMessageFrom_HttpErrorResponse(httpError);
        
      }

      if (httpError.message) {
        ex.Message = ex.Message + "\r\n" + httpError.message;
      }
      return throwError(ex);
    }


    ex.Message = httpError.message;

    return throwError(ex);

  }



  public handleErrorObservable(error: ServiceError) {

    console.error(error.Message || error);
    return Observable.throw(error.message);
  }
  public handleErrorPromise(error: Response | any) {

    return Promise.reject(error.message || error);
  }

  public handleHttpError(error) {
    console.log(JSON.stringify(error));
    if (error.status == '401') {
      //Error de permisos
      this.router.navigate(['login']);
    } else {
      console.log('Oto error status : ' + error.status);
    }

    return Observable.throw(error._body)
  }
  //cuando se le pasa un byte[] retorna su base64 string
  public convert_byteArrayTobase64(arrayBuffer: ArrayBuffer): string {
    var base64String = btoa(String.fromCharCode.apply(null, new Uint8Array(arrayBuffer)));
    return base64String;
  }
}
