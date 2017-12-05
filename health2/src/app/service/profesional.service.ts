import { Injectable,Inject } from '@angular/core';
import { ProfesionalBE,PersonBE,ResourceSchedulingBE,HealthInstitution_ProfesionalBE,GetProfesionalRes } from '../model/index';
import { Param, IParam, IContextInformation, IRequest, IResponse, Result,User } from '../model/common.model';
import { HealtConstants, contextInfo } from "../model/common.constants";
import { Http, Response, RequestOptions, Headers, URLSearchParams } from '@angular/http';

// permmite cambiar la variable obsevada
import { Subject } from 'rxjs/Subject';
// permite observar
import { Observable } from 'rxjs/Observable';
import { CommonService } from '../service/common.service';
import 'rxjs/add/operator/map';

@Injectable()
export class ProfesionalService {

  private contextInfo: IContextInformation;
  private commonService: CommonService;

  constructor(private http: Http, @Inject(CommonService) commonService: CommonService) {
    this.contextInfo = contextInfo;
    this.commonService = commonService;
  }


  
  getProfesionalService$(
                        includeScheduler:Boolean,
                       includeSecurityInfo:Boolean,
                       idProfesional?: number,
                       userGuid ?:String,
                       healthInstitutionId?:String,includeAllInstitutions?:Boolean,
                       personaId?:String): Observable<GetProfesionalRes> {

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

        let result: Result= JSON.parse(res.json());

        if (result.Error) {
          throw  Observable.throw(result.Error);
        }

        let profesionalBE: ProfesionalBE = result.BusinessData['ProfesionalBE'] as ProfesionalBE;
        let resourceSchedulingList: ResourceSchedulingBE[] = result.BusinessData['ResourceSchedulingList'] as ResourceSchedulingBE[];
        let user: User = result.BusinessData['User'] as User;

        let healthInstitution_ProfesionalBE= result.BusinessData['HealthInstitution_ProfesionalBE'] as HealthInstitution_ProfesionalBE;
        let healthInstitution_ProfesionalList= result.BusinessData['HealthInstitution_ProfesionalList'] as HealthInstitution_ProfesionalBE[];

        let response:GetProfesionalRes = new GetProfesionalRes() ;

        response.ProfesionalBE=profesionalBE;

        response.HealthInstitution_ProfesionalBE=healthInstitution_ProfesionalBE;
        response.User=user;
        response.HealthInstitution_ProfesionalBE=healthInstitution_ProfesionalBE;
        response.HealthInstitution_ProfesionalList =healthInstitution_ProfesionalList;

        return response;
      }).catch(this.commonService.handleError);
  }

}
