import { Injectable } from '@angular/core';
import { HealtConstants, contextInfo, CommonParams } from "../model/common.constants";
import { Param, IParam, IContextInformation, ContextInformation, ExecuteReq, Request, IRequest, IResponse, Result, ServiceError, CurrentLogin, IpInfo } from '../model/common.model';
//import { Http, RequestOptions } from 'rxjs/header';
//permmite cambiar la variable obsevada
import { Subject, throwError } from 'rxjs';
import { Router } from '@angular/router'
import { HttpHeaders, HttpClient, HttpErrorResponse } from '@angular/common/http';
import { map, catchError } from 'rxjs/operators';
import { Observable } from 'rxjs';
//var colors = require('colors/safe');


@Injectable()
export class CommonService {
  public paramList: Param[] = [];
  public paramList$: Subject<Param[]> = new Subject<Param[]>();
  private ipinfo:IpInfo;
  public mainComponentTitle_subject$: Subject<string> = new Subject<string>();

  constructor(private http: HttpClient, private router: Router) {

    this.ipinfo = new IpInfo();
    this.getIP().subscribe(res=>{
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


  parseDate(dateString: string): Date {
    
    
    let f: Date;
    if (dateString) {
      f = new Date(dateString);

      return f;//new Date(dateString);
    } else {
      return null;
    }

  }


  serarPlaces_google_place_api(input: string) {
    //console.log('Ejecutando serarPlaces_google_place_api()');
    var api_url = 'https://maps.googleapis.com/maps/api/place/autocomplete/json?input=[input]&types=geocode&key=AIzaSyAEBn6XjDRlouhZP-nQHSU4equHUeR2wEc';

    api_url = api_url.replace('[input]', input);
    api_url = api_url.replace('[input]', input);

    return this.http.get(`${api_url}`, HealtConstants.httpClientOption_contenttype_json).pipe(
      map(function (res: Response) {
        //let places = JSON.parse(res.json());
        console.log(res);
      }));
  }

  /**
   * @idTipoParametro : Nombre de tabla
   * @idParametroRef : Subnombre , subcategoria
   */
  searchParametroByParams$(idTipoParametro: number, idParametroRef: number): Observable<Param[]> {

    var bussinesData = {
      IdParametroRef: idParametroRef,
      IdTipoParametro: idTipoParametro,
      Vigente: true
    };
  
    let executeReq=  this.generete_post_Params("SearchParametroByParamsService", bussinesData);

    return this.http.post<Param[]>(`${HealtConstants.HealthExecuteAPI_URL}`,executeReq, HealtConstants.httpClientOption_contenttype_json).pipe(
      map(function (res) {

        let resToObject: Result;
        resToObject = JSON.parse(res.toString());

        if (resToObject.Error) {

          throw Observable.throw(resToObject.Error);
        }

        let params: Param[] = resToObject.BusinessData as Param[];

        return params;
      })
      
      ).pipe( catchError(this.handleError));

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
    let currentLogin:CurrentLogin = JSON.parse( localStorage.getItem('currentLogin') );
    contextInfo.Culture = "ES-AR";
    contextInfo.ProviderNameWithCultureInfo = "";
    contextInfo.HostName = this.ipinfo.city + this.ipinfo.country;
    contextInfo.HostIp =  this.ipinfo.ip;
    contextInfo.HostTime = new Date(),
    contextInfo.ServerName = '';
    contextInfo.ServerTime = new Date();


    if(currentLogin && currentLogin.username)
      {contextInfo.UserName = currentLogin.username;}
      else{contextInfo.UserName = 'mrenaudo';}
      
    contextInfo.UserId = 'mrenaudo';
    contextInfo.AppId = 'Health';
    contextInfo.ProviderName = 'healthTesting';
    req.ContextInformation = contextInfo;
    req.BusinessData = bussinesData;
    req.Error = null;
    req.SecurityProviderName = "";
    req.Encrypt = false;

    return req;
  }

  //Retorna un HttpHeaders con CORS y 'Authorization': "Bearer + TOKEN"
  public get_AuthorizedHeader():HttpHeaders{
    
    
    let currentLogin:CurrentLogin = JSON.parse( localStorage.getItem('currentLogin') );

    let header_httpClient_contentTypeJson = new HttpHeaders({ 'Authorization': 'Bearer ' + currentLogin.oAuth.access_token });
    header_httpClient_contentTypeJson.append('Content-Type','application/json');
    
     
    header_httpClient_contentTypeJson.append('Access-Control-Allow-Methods', '*');
    header_httpClient_contentTypeJson.append('Access-Control-Allow-Headers', 'Content-Type, Access-Control-Allow-Headers, Authorization, X-Requested-With');
    header_httpClient_contentTypeJson.append('Access-Control-Allow-Origin', '*');

    //let headerOptions = {headers:headers} ;
    //alert(JSON.stringify(headers));
    return header_httpClient_contentTypeJson;
  }

  public handleErrorService(serviceError: ServiceError) {
    if (serviceError) {
      alert("Se encontraron errores " + serviceError.Message);
    }
  }

  ///Error inspection, interpretation, and resolution is something you want to do in the service, not in the component.
  public handleError(error: HttpErrorResponse | any) {

    console.log('-------------------Error---------------------');
    console.log(error.message);
    //console.log(error.status);
    //console.log(error.message);
    console.log('----------------------------------------');
    
    if (error.error instanceof ErrorEvent) {
      // A client-side or network error occurred. Handle it accordingly.
      console.log('Client-side error occurred:', error.error.message);
    } else {
      // The backend returned an unsuccessful response code.
      // The response body may contain clues as to what went wrong,
      console.log(
        `Backend returned code ${error.status}, ` +
        `body was: ${error.error}`);
    }
    let ex: ServiceError = new ServiceError();

    if (error instanceof HttpErrorResponse    ) {
      //alert(error.error);
      ex.Status= error.status;
      if(error.error){
        ex.Message = error.error;
      }
      if(error.message){
        ex.Message = ex.Message + "\r\n" + error.message;
      }
    }


    
    //ex.Message = 'Despachador de servicio no responde .-';
   
    // if(error.message){
    //   ex.Message = ex.Message + "\r\n" + error.message;
    // }
    // if(error.error.message){
    //   ex.Message = ex.Message + "\r\n" + error.error.message;
    // }
   

    // if(error.message){
    //   ex.Message = error + "\r\n" + error.message;
    // }
   
    ex.Machine = 'PC-Desarrollo';

    return throwError(ex);  // return an observable with a user-facing error message
    //return Observable.throw(ex); // <= B // se comenta para la version 7
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


  getIP(): Observable<any> {

    return this.http.get<string[]>('http://ipinfo.io?token=21ea63fe5267b3').pipe(
      map(function (res) {
         return res;
      })).pipe( catchError(this.handleError));


      
}
}
