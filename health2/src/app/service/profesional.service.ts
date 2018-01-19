import { Injectable, Inject } from '@angular/core';

import { Http, Response, RequestOptions, Headers, URLSearchParams } from '@angular/http';

// permmite cambiar la variable obsevada
import { Subject } from 'rxjs/Subject';
// permite observar
import { Observable } from 'rxjs/Observable';
import { CommonService } from '../service/common.service';
import 'rxjs/add/operator/map';
import { ProfesionalBE, PersonBE, ResourceSchedulingBE, HealthInstitution_ProfesionalBE, GetProfesionalRes,ProfesionalesGridBE,Profesional_FullViewBE} from '../model/index';
import { Param, IParam, IContextInformation, IRequest, IResponse, Result, User, Rol } from '../model/common.model';
import { HealtConstants, contextInfo } from "../model/common.constants";

@Injectable()
export class ProfesionalService {

  private contextInfo: IContextInformation;
  private commonService: CommonService;

  constructor(private http: Http, @Inject(CommonService) commonService: CommonService) {
    this.contextInfo = contextInfo;
    this.commonService = commonService;
  }



  getProfesionalService$(
    includeScheduler: boolean,
    includeSecurityInfo: boolean,
    idProfesional?: number,
    userGuid?: String,
    healthInstitutionId?: String, includeAllInstitutions?: boolean,
    personaId?: String): Observable<GetProfesionalRes> {

    var bussinesData = {
      IdProfesional: idProfesional,
      IncludeScheduler: includeScheduler,
      IncludeSecurityInfo: includeSecurityInfo,
      UserGuid: userGuid,
      HealthInstitutionId: healthInstitutionId,
      IncludeAllInstitutions: includeAllInstitutions,
      PersonaId: personaId

    };

    let searchParams: URLSearchParams = this.commonService.generete_get_searchParams("GetProfesionalService", bussinesData);

    HealtConstants.httpOptions.search = searchParams;

    return this.http.get(`${HealtConstants.HealthExecuteAPI_URL}`, HealtConstants.httpOptions)
      .map(function (res: Response) {

        let result: Result = JSON.parse(res.json());

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
      }).catch(this.commonService.handleError);
  }

  DesvincularProfesionalService$(
    profesionalId?: number,
    healthInstitutionId?: String, 
    ): Observable<Boolean> {

    var bussinesData = {
      ProfesionalId: profesionalId,
      HealthInstitutionId: healthInstitutionId,
    };

    let searchParams: URLSearchParams = this.commonService.generete_get_searchParams("DesvincularProfesionalService", bussinesData);

    HealtConstants.httpOptions.search = searchParams;

    return this.http.get(`${HealtConstants.HealthExecuteAPI_URL}`, HealtConstants.httpOptions)
      .map(function (res: Response) {

        let result: Result = JSON.parse(res.json());

        if (result.Error) {
          throw Observable.throw(result.Error);
        }
        return true;
      }).catch(this.commonService.handleError);
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

    let searchParams: URLSearchParams = this.commonService.generete_get_searchParams("CrearProfesionalService", bussinesData);

    HealtConstants.httpOptions.search = searchParams;

    return this.http.get(`${HealtConstants.HealthExecuteAPI_URL}`, HealtConstants.httpOptions)
      .map(function (res: Response) {

        let result: Result = JSON.parse(res.json());

        if (result.Error) {
          throw Observable.throw(result.Error);
        }
        // let IdProfesional: number = result.BusinessData['IdProfesional'] as number;
        // let UserId: string = result.BusinessData['UserId'] as string;
        return result.BusinessData;
      }).catch(this.commonService.handleError);
  }


  UpdateProfesionalService$(
    profesionalBE: ProfesionalBE,
    user: User, 
    healthInstitutionId:string,
    soloAsociarProfesionalAinst:Boolean
    ): Observable<Boolean> {

    var bussinesData = {
      Profesional: profesionalBE,
      User:user,
      HealthInstitutionId: healthInstitutionId
   
    };

    let searchParams: URLSearchParams = this.commonService.generete_get_searchParams("UpdateProfesionalService", bussinesData);

    HealtConstants.httpOptions.search = searchParams;

    return this.http.get(`${HealtConstants.HealthExecuteAPI_URL}`, HealtConstants.httpOptions)
      .map(function (res: Response) {

        let result: Result = JSON.parse(res.json());

        if (result.Error) {
          throw Observable.throw(result.Error);
        }

        return true;
      }).catch(this.commonService.handleError);
  }
  retriveProfesionalesGrid$(
    nombre: string,
    apellido: string,
    healthInstitutionId?: string

  ): Observable<ProfesionalesGridBE[]> {

    var bussinesData = {
      Nombre: nombre,
      Apellido: apellido,
      HealthInstId: healthInstitutionId

    };

    let searchParams: URLSearchParams = this.commonService.generete_get_searchParams("RetriveProfesionalesGridService", bussinesData);

    HealtConstants.httpOptions.search = searchParams;
    return this.http.get(`${HealtConstants.HealthExecuteAPI_URL}`, HealtConstants.httpOptions)
      .map(function (res: Response) {

        let result: Result = JSON.parse(res.json());
        
        if (result.Error) {
          throw Observable.throw(result.Error);
        }
        var profesionalesGridBEList: ProfesionalesGridBE[] = result.BusinessData as ProfesionalesGridBE[];
      
        return profesionalesGridBEList;
      }).catch(this.commonService.handleError);
  }



  retriveProfesionalesService$(
    nombre: string,
    apellido: string, 
    healthInstitutionId?:string
    
    ): Observable<Profesional_FullViewBE []> {

    var bussinesData = {
      Nombre: nombre,
      Apellido:apellido,
      HealthInstId: healthInstitutionId
      
    };

    let searchParams: URLSearchParams = this.commonService.generete_get_searchParams("RetriveProfesionalesService", bussinesData);

    HealtConstants.httpOptions.search = searchParams;

    return this.http.get(`${HealtConstants.HealthExecuteAPI_URL}`, HealtConstants.httpOptions)
      .map(function (res: Response) {

        let result: Result = JSON.parse(res.json());

        if (result.Error) {
          throw Observable.throw(result.Error);
        }
         var profesional_FullView : Profesional_FullViewBE[] = result.BusinessData as Profesional_FullViewBE[];
        
        return profesional_FullView;
      }).catch(this.commonService.handleError);
  }


  RetriveProfesionalesGridService$(
    nombre: string,
    apellido: string, 
    healthInstitutionId?:string
    
    ): Observable<ProfesionalesGridBE []> {

    var bussinesData = {
      Nombre: nombre,
      Apellido:apellido,
      HealthInstId: healthInstitutionId
      
    };

    let searchParams: URLSearchParams = this.commonService.generete_get_searchParams("RetriveProfesionalesGridService", bussinesData);

    HealtConstants.httpOptions.search = searchParams;

    return this.http.get(`${HealtConstants.HealthExecuteAPI_URL}`, HealtConstants.httpOptions)
      .map(function (res: Response) {

        let result: Result = JSON.parse(res.json());

        if (result.Error) {
          throw Observable.throw(result.Error);
        }
         var ProfesionalesGridBELis : ProfesionalesGridBE[] = result.BusinessData as ProfesionalesGridBE[];
        
        return ProfesionalesGridBELis;
      }).catch(this.commonService.handleError);
  }

  //Si se pasa userName = string.empty se traen todos los roles existentes
  getAllRoles$(username: string): Observable<Rol[]> {
    var bussinesData = {
      UserName: username
    };
    
    let searchParams: URLSearchParams = this.commonService.generete_get_searchParams("SearchAllRolesService", bussinesData);
    HealtConstants.httpOptions.search = searchParams;

    return this.http.get(`${HealtConstants.HealthExecuteAPI_URL}`, HealtConstants.httpOptions)
    .map(function (res: Response) {
     
      let result: Result= JSON.parse(res.json());
      
      if (result.Error) {
        throw  Observable.throw(result.Error);
      }

      let rolList: Rol[] = result.BusinessData['RolList'] as Rol[];

      return rolList;
    }).catch(this.commonService.handleError);
 
  }

  validateUserExist$(username: string): Observable<any> {
    var bussinesData = {
      UserName: username
    };

    let searchParams: URLSearchParams = this.commonService.generete_get_searchParams("ValidateUserExistService", bussinesData);
    HealtConstants.httpOptions.search = searchParams;

    return this.http.get(`${HealtConstants.HealthExecuteAPI_URL}`, HealtConstants.httpOptions)
    .map(function (res: Response) {
     
      let result: Result= JSON.parse(res.json());
      
      if (result.Error) {
        throw  Observable.throw(result.Error);
      }

      let exist: boolean = result.BusinessData['Exist'] as boolean;

      return exist;
    }).catch(this.commonService.handleError);
 
  }


  resetUserPassword$(username: string,password: string): Observable<any> {
    var bussinesData = {
      UserName: username,
      NewPassword: password
    };

    let searchParams: URLSearchParams = this.commonService.generete_get_searchParams("ResetUserPasswordService", bussinesData);
    HealtConstants.httpOptions.search = searchParams;

    return this.http.get(`${HealtConstants.HealthExecuteAPI_URL}`, HealtConstants.httpOptions)
    .map(function (res: Response) {
     
      let result: Result= JSON.parse(res.json());
      
      if (result.Error) {
        throw  Observable.throw(result.Error);
      }
      return true;
    }).catch(this.commonService.handleError);
 
  }

}
