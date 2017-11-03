import { Injectable } from '@angular/core';
import { HealtConstants, contextInfo, CommonParams } from "../model/common.constants";
import { Param, IParam, IContextInformation, ContextInformation, Request, IRequest, IResponse, Result, ServiceError } from '../model/common.model';
import { Http, Response, RequestOptions, Headers, URLSearchParams } from '@angular/http';
//permmite cambiar la variable obsevada
import { Subject } from 'rxjs/Subject';
//permite observar
import { Observable } from 'rxjs/Observable';

@Injectable()
export class CommonService {
  public paramList: Param[] = [];
  public paramList$: Subject<Param[]> = new Subject<Param[]>();
  constructor(private http: Http) {
    
   }


  serarPlaces_google_place_api(input :string ){
    console.log('Ejecutando serarPlaces_google_place_api()');
    var api_url = 'https://maps.googleapis.com/maps/api/place/autocomplete/json?input=[input]&types=geocode&key=AIzaSyAEBn6XjDRlouhZP-nQHSU4equHUeR2wEc';
    
    api_url = api_url.replace('[input]',input);
    api_url = api_url.replace('[input]',input);
    
    return this.http.get(`${api_url}`, HealtConstants.httpOptions)
    .map(function (res: Response) {
      let places = JSON.parse(res.json());
      console.log(places);
    });
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

    let searchParams: URLSearchParams = this.generete_get_searchParams("SearchParametroByParamsService", bussinesData);
    HealtConstants.httpOptions.search = searchParams;

    return this.http.get(`${HealtConstants.HealthExecuteAPI_URL}`, HealtConstants.httpOptions)
      .map(function (res: Response) {

        let resToObject: Result;
        resToObject = JSON.parse(res.json());

        if (resToObject.Error) {
          alert("Se encontraron errores " + resToObject.Error.Message);
        }

        let params: Param[] = resToObject.BusinessData as Param[];

        return params;
      });
  }
   /**
   * @params : parametros 
   * @parameterToAppend : CommonParam.Id
   */
  appendExtraParamsCombo( params:  Param[], parameterToAppend: number): Param[] {
    
     
           var p: Param = new Param();
 
           
           switch (+parameterToAppend) {
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
  createFwk_SOA_REQ(bussinesData: any): Request {
    let contextInfo: ContextInformation = new ContextInformation();
    let req: Request = new Request();

    contextInfo.Culture = "ES-AR";
    contextInfo.ProviderNameWithCultureInfo = "";
    contextInfo.HostName = 'localhost';
    contextInfo.HostIp = '10.10.200.168';
    contextInfo.HostTime = new Date(),
      contextInfo.ServerName = 'WebAPIDispatcherClienteWeb';
    contextInfo.ServerTime = new Date();
    contextInfo.UserName = 'moviedo',
      contextInfo.UserId = '';
    contextInfo.AppId = 'Healt';
    contextInfo.ProviderName = 'health';
    req.ContextInformation = contextInfo;
    req.BusinessData = bussinesData;
    req.Error = null;
    req.SecurityProviderName = "";
    req.Encrypt = false;

    return req;
  }



  public handleErrorService(serviceError: ServiceError) {
    if (serviceError) {
      alert("Se encontraron errores " + serviceError.Message);
    }
  }

  public handleErrorObservable(error: Response | any) {
    console.error(error.message || error);
    return Observable.throw(error.message || error);
  }
  public handleErrorPromise(error: Response | any) {
    console.error(error.message || error);
    return Promise.reject(error.message || error);
  }

  //cuando se le pasa un byte[] retorna su base64 string
  public convert_byteArrayTobase64(arrayBuffer:ArrayBuffer):string
  {
    var base64String = btoa(String.fromCharCode.apply(null, new Uint8Array(arrayBuffer)));
    return  base64String;
  }
}
