import { Injectable, Inject } from '@angular/core';
import { Subject } from 'rxjs/Subject';
import { Observable } from 'rxjs/Observable';
import { Http, Response, RequestOptions, Headers, URLSearchParams } from '@angular/http';
import {PersonBE} from '../../app/model/persons.model'
import { HealtConstants, contextInfo } from "../model/common.constants";
import { Param, IParam, IContextInformation, IRequest, IResponse, Result, User, Rol } from '../model/common.model';
import { CommonService } from '../service/common.service';

@Injectable()
export class PersonsService {
  private contextInfo: IContextInformation;
  
  constructor(private http: Http,private commonService: CommonService) {
    this.contextInfo = contextInfo;
    
  }


  retrivePersonesGrid$(
    nombre: string,    apellido: string,    motivoConsulta:string,    nroDocumento?: string     ): Observable<PersonBE[]> {

    var bussinesData = {
      Nombre: nombre,
      Apellido: apellido,
      NroDocumento: nroDocumento,
      MotivoConsulta: motivoConsulta

    };
  console.log(bussinesData);
    let searchParams: URLSearchParams = this.commonService.generete_get_searchParams("RetrivePersonasService", bussinesData);

    HealtConstants.httpOptions.search = searchParams;
    return this.http.get(`${HealtConstants.HealthExecuteAPI_URL}`, HealtConstants.httpOptions)
      .map(function (res: Response) {

        let result: Result = JSON.parse(res.json());
        
        if (result.Error) {
          throw Observable.throw(result.Error);
        }
        var profesionalesGridBEList: PersonBE[] = result.BusinessData as PersonBE[];
      
        return profesionalesGridBEList;
      }).catch(this.commonService.handleError);
  }

  getPersonaByParamService$(
    personaId: number,
    nroDocumento: String): Observable<PersonBE> {

      if(!personaId)
      personaId=-1;
    var bussinesData = {
      Id: personaId,
      NroDocumento: nroDocumento,
    

    };

    let searchParams: URLSearchParams = this.commonService.generete_get_searchParams("GetPersonaByParamService", bussinesData);

    HealtConstants.httpOptions.search = searchParams;

    return this.http.get(`${HealtConstants.HealthExecuteAPI_URL}`, HealtConstants.httpOptions)
      .map(function (res: Response) {

        let result: Result = JSON.parse(res.json());

        if (result.Error) {
          throw Observable.throw(result.Error);
        }

        return result.BusinessData["Persona"] as PersonBE;
        
      }).catch(this.commonService.handleError);
  }
}

