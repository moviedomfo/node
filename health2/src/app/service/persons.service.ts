import { Injectable, Inject } from '@angular/core';
// permmite cambiar la variable obsevada
import { Observable } from 'rxjs';
import { map, catchError } from 'rxjs/operators';
import {  Response, RequestOptions, Headers } from '@angular/http';
import {PersonBE} from '../../app/model/persons.model'
import { HealtConstants, contextInfo } from "../model/common.constants";
import { Param, IParam, IContextInformation, IRequest, IResponse, Result, User, Rol } from '../model/common.model';
import { CommonService } from '../service/common.service';
import { HttpClient } from '@angular/common/http';

@Injectable()
export class PersonsService {
  private contextInfo: IContextInformation;
  
  constructor(private http: HttpClient,private commonService: CommonService) {
    this.contextInfo = contextInfo;
    
  }


  retrivePersonesGrid$(
    nombre: string,apellido: string,motivoConsulta:string,nroDocumento?: string): Observable<PersonBE[]> {

    var bussinesData = {
      Nombre: nombre,
      Apellido: apellido,
      NroDocumento: nroDocumento,
      MotivoConsulta: motivoConsulta

    };
  console.log(bussinesData);
    let executeReq=  this.commonService.generete_post_Params("RetrivePersonasService", bussinesData);
    
    return  this.http.post<Result>(`${HealtConstants.HealthExecuteAPI_URL}`,executeReq,HealtConstants.httpClientOption_contenttype_json).pipe(
       map(result => {

        
        
        if (result.Error) {
          throw Observable.throw(result.Error);
        }
        var profesionalesGridBEList: PersonBE[] = result.BusinessData as PersonBE[];
      
        return profesionalesGridBEList;
      })).pipe(catchError(this.commonService.handleError));
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

    let executeReq=  this.commonService.generete_post_Params("GetPersonaByParamService", bussinesData);
    
    return  this.http.post<Result>(`${HealtConstants.HealthExecuteAPI_URL}`,HealtConstants.httpClientOption_contenttype_json).pipe(
       map(result => {

        

        if (result.Error) {
          throw Observable.throw(result.Error);
        }

        return result.BusinessData["Persona"] as PersonBE;
        
      })).pipe(catchError(this.commonService.handleError));
  }
}

