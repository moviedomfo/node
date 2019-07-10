import { Injectable, Inject } from '@angular/core';

// permmite cambiar la variable obsevada
import { Observable } from 'rxjs';
import { map, catchError } from 'rxjs/operators';
import { CommonService } from '../service/common.service';
import 'rxjs/add/operator/map';
import { ProfesionalBE, PersonBE, ResourceSchedulingBE,
   HealthInstitution_ProfesionalBE, 
  GetProfesionalRes,ProfesionalesGridBE,Profesional_FullViewBE,
  Param, IParam, IContextInformation, IRequest, IResponse, Result, User, Rol} from '../model/index';

import { HealtConstants, contextInfo } from "../model/common.constants";
import { HttpClient } from '@angular/common/http';

@Injectable()
export class ProfesionalService {

  private contextInfo: IContextInformation;
  private commonService: CommonService;

  constructor(private http: HttpClient, commonService: CommonService) {
    this.contextInfo = contextInfo;
    this.commonService = commonService;
  }



  getProfesionalService$(
    includeScheduler: boolean,
    includeSecurityInfo: boolean,
    idProfesional?: number,
    userGuid?: String,
    healthInstitutionId?: String, includeAllInstitutions?: boolean,
    personaId?: String): Observable<any> {

    var bussinesData = {
      IdProfesional: idProfesional,
      IncludeScheduler: includeScheduler,
      IncludeSecurityInfo: includeSecurityInfo,
      UserGuid: userGuid,
      HealthInstitutionId: healthInstitutionId,
      IncludeAllInstitutions: includeAllInstitutions,
      PersonaId: personaId

    };

  
    let executeReq=  this.commonService.generete_post_Params("GetProfesionalService", bussinesData);

    return this.http.post<Result>(`${HealtConstants.HealthExecuteAPI_URL}`, executeReq,HealtConstants.httpClientOption_contenttype_json).pipe(
      map(result => {
        if (result.Error) {
          throw Observable.throw(result.Error);
        }
        let profesionalBE: ProfesionalBE = result.BusinessData['profesional'] as ProfesionalBE;
     
        let resourceSchedulingList: ResourceSchedulingBE[] = result.BusinessData['ResourceSchedulerList'] as ResourceSchedulingBE[];
        let user: User = result.BusinessData['User'] as User;

        let healthInstitution_ProfesionalBE = result.BusinessData['HealthInstitution_ProfesionalBE'] as HealthInstitution_ProfesionalBE;
        let healthInstitution_ProfesionalList = result.BusinessData['HealthInstitution_ProfesionalList'] as HealthInstitution_ProfesionalBE[];

        let response: GetProfesionalRes = new GetProfesionalRes();

        response.ProfesionalBE = profesionalBE;

        response.HealthInstitution_ProfesionalBE = healthInstitution_ProfesionalBE;
        response.User = user;
        //alert(response.User);
        //alert(JSON.stringify( 'getProfesionalService ' + response.User.Roles ));
        response.ResourceSchedulingList = resourceSchedulingList;
        response.HealthInstitution_ProfesionalList = healthInstitution_ProfesionalList;

        return response;
      })).pipe(catchError(this.commonService.handleError));


 
  }

  DesvincularProfesionalService$(profesionalId?: number,  healthInstitutionId?: String): Observable<any> {

    var bussinesData = {
      ProfesionalId: profesionalId,
      HealthInstitutionId: healthInstitutionId,
    };

    let executeReq=  this.commonService.generete_post_Params("DesvincularProfesionalService", bussinesData);


    return this.http.post<Result>(`${HealtConstants.HealthExecuteAPI_URL}`,executeReq,HealtConstants.httpClientOption_contenttype_json).pipe(
      map(result => {

        //let result: Result = JSON.parse(res.toString());

        if (result.Error) {
          throw Observable.throw(result.Error);
        }
        return true;
      })).pipe(catchError(this.commonService.handleError));
  }


  crearProfesionalService$(
    profesionalBE: ProfesionalBE,
    user: User, 
    healthInstitutionId:string,
    soloAsociarProfesionalAinst:Boolean
    ): Observable<any> {

    var bussinesData = {
      Profesional: profesionalBE,
      User:user,
      HealthInstitutionId: healthInstitutionId,
      SoloAsociarProfesionalAinst:soloAsociarProfesionalAinst
    };

    let executeReq=  this.commonService.generete_post_Params("CrearProfesionalService", bussinesData);
    return this.http.post<Result>(`${HealtConstants.HealthExecuteAPI_URL}`, executeReq,HealtConstants.httpClientOption_contenttype_json).pipe(
      map(result => {

        if (result.Error) {
          throw Observable.throw(result.Error);
        }
        // let IdProfesional: number = result.BusinessData['IdProfesional'] as number;
        // let UserId: string = result.BusinessData['UserId'] as string;
        return result.BusinessData;
       })).pipe(catchError(this.commonService.handleError));
  }


  UpdateProfesionalService$(profesionalBE: ProfesionalBE,user: User,healthInstitutionId:string,soloAsociarProfesionalAinst:boolean): Observable<any> {

    var bussinesData = {
      Profesional: profesionalBE,
      User:user,
      HealthInstitutionId: healthInstitutionId
   
    };

   
    let executeReq=  this.commonService.generete_post_Params("UpdateProfesionalService", bussinesData);
    return this.http.post<Result>(HealtConstants.HealthExecuteAPI_URL,executeReq,HealtConstants.httpClientOption_contenttype_json).pipe(
      map(result => {
        //let result: Result = JSON.parse(res.toString());

        if (result.Error) {
          throw Observable.throw(result.Error);
        }
        return true;
      })).pipe(catchError(this.commonService.handleError));

  }


  retriveProfesionalesGrid$(
    nombre: string,
    apellido: string,
    healthInstitutionId?: string

  ): Observable<any> {

    var bussinesData = {
      Nombre: nombre,
      Apellido: apellido,
      HealthInstId: healthInstitutionId

    };

    let executeReq=  this.commonService.generete_post_Params("RetriveProfesionalesGridService", bussinesData);
    return this.http.post<Result>(`${HealtConstants.HealthExecuteAPI_URL}`,executeReq,HealtConstants.httpClientOption_contenttype_json).pipe(
      map(result => {

        //let result: Result = JSON.parse(res.toString());
        
        if (result.Error) {
          throw Observable.throw(result.Error);
        }
        var profesionalesGridBEList: ProfesionalesGridBE[] = result.BusinessData as ProfesionalesGridBE[];
      
        return profesionalesGridBEList;
      })).pipe(catchError(this.commonService.handleError));
    

  }



  retriveProfesionalesService$(
    nombre: string,
    apellido: string, 
    healthInstitutionId?:string    
    ): Observable<any> {

    var bussinesData = {
      Nombre: nombre,
      Apellido:apellido,
      HealthInstId: healthInstitutionId
      
    };

    let executeReq=  this.commonService.generete_post_Params("RetriveProfesionalesService", bussinesData);

    return this.http.post<Result>(`${HealtConstants.HealthExecuteAPI_URL}`,executeReq,HealtConstants.httpClientOption_contenttype_json).pipe(
      map(result => {

        //let result: Result = JSON.parse(res.toString());

        if (result.Error) {
          throw Observable.throw(result.Error);
        }
         var profesional_FullView : Profesional_FullViewBE[] = result.BusinessData as Profesional_FullViewBE[];
        
        return profesional_FullView;
      })).pipe(catchError(this.commonService.handleError));
  }


  RetriveProfesionalesGridService$(
    nombre: string,
    apellido: string, 
    healthInstitutionId?:string
    
    ): Observable<any> {

    var bussinesData = {
      Nombre: nombre,
      Apellido:apellido,
      HealthInstId: healthInstitutionId
      
    };


    let executeReq=  this.commonService.generete_post_Params("RetriveProfesionalesGridService", bussinesData);
    return this.http.post<Result>(`${HealtConstants.HealthExecuteAPI_URL}`,executeReq,HealtConstants.httpClientOption_contenttype_json).pipe(
      map(result => {

        //let result: Result = JSON.parse(res.toString());

        if (result.Error) {
          throw Observable.throw(result.Error);
        }
         var ProfesionalesGridBELis : ProfesionalesGridBE[] = result.BusinessData as ProfesionalesGridBE[];
        
        return ProfesionalesGridBELis;
      })).pipe(catchError(this.commonService.handleError));
  }

  //Si se pasa userName = string.empty se traen todos los roles existentes
  getAllRoles$(username: string): Observable<any> {
    var bussinesData = {
      UserName: username
    };
    let executeReq=  this.commonService.generete_post_Params("SearchAllRolesService", bussinesData);
    return this.http.post<Result>(`${HealtConstants.HealthExecuteAPI_URL}`,executeReq,HealtConstants.httpClientOption_contenttype_json).pipe(
      map(result => {
     
      //let result: Result= JSON.parse(res.toString());
      
      if (result.Error) {
        throw  Observable.throw(result.Error);
      }

      let rolList: Rol[] = result.BusinessData['RolList'] as Rol[];

      return rolList;
    })).pipe(catchError(this.commonService.handleError));
 
  }

  validateUserExist$(username: string): Observable<any> {
    var bussinesData = {
      UserName: username
    };


    let executeReq=  this.commonService.generete_post_Params("ValidateUserExistService", bussinesData);
    return this.http.post<Result>(`${HealtConstants.HealthExecuteAPI_URL}`,executeReq,HealtConstants.httpClientOption_contenttype_json).pipe(
    map(result => {
     

      if (result.Error) {
        throw  Observable.throw(result.Error);
      }

      let exist: boolean = result.BusinessData['Exist'] as boolean;

      return exist;
    })).pipe(catchError(this.commonService.handleError));
 
  }


  resetUserPassword$(username: string,password: string): Observable<any> {
    var bussinesData = {
      UserName: username,
      NewPassword: password
    };

    let executeReq=  this.commonService.generete_post_Params("ResetUserPasswordService", bussinesData);
    return this.http.post<Result>(`${HealtConstants.HealthExecuteAPI_URL}`,executeReq,HealtConstants.httpClientOption_contenttype_json).pipe(
    map(result=> {
      
      if (result.Error) {
        throw  Observable.throw(result.Error);
      }
      return true;
  
    })).pipe(catchError(this.commonService.handleError));
 
  }

}
