import { Injectable, Inject } from '@angular/core';
import { ProfesionalBE, PersonBE, ResourceSchedulingBE, HealthInstitution_ProfesionalBE, GetProfesionalRes } from '../model/index';
import { Param, IParam, IContextInformation, IRequest, IResponse, Result, User } from '../model/common.model';
import { HealtConstants, contextInfo } from "../model/common.constants";
import { Http, Response, RequestOptions, Headers, URLSearchParams } from '@angular/http';

// permmite cambiar la variable obsevada
import { Subject } from 'rxjs/Subject';
// permite observar
import { Observable } from 'rxjs/Observable';
import { CommonService } from '../service/common.service';
import 'rxjs/add/operator/map';
import { Profesional_FullViewBE, ProfesionalesGridBE, AppointmentsBE } from "../model/profesional.model";

@Injectable()
export class ShedulingServiceService {

  private contextInfo: IContextInformation;
  private commonService: CommonService;

  constructor(private http: Http, @Inject(CommonService) commonService: CommonService) {
    this.contextInfo = contextInfo;
    this.commonService = commonService;
  }

  CreateAppointmentsService$(
    AppointmentsList: AppointmentsBE[]
   ): Observable<boolean> {

    var bussinesData = {
      AppointmentsList: AppointmentsList
    };

    let searchParams: URLSearchParams = this.commonService.generete_get_searchParams("CreateAppointmentsService", bussinesData);

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


  GetAppoinmentByParamsService$(
    AppointmentId?: number
   ): Observable<AppointmentsBE> {

    var bussinesData = {
      AppointmentId: AppointmentId
    };

    let searchParams: URLSearchParams = this.commonService.generete_get_searchParams("GetAppoinmentByParamsService", bussinesData);

    HealtConstants.httpOptions.search = searchParams;

    return this.http.get(`${HealtConstants.HealthExecuteAPI_URL}`, HealtConstants.httpOptions)
      .map(function (res: Response) {

        let result: Result = JSON.parse(res.json());

        if (result.Error) {
          throw Observable.throw(result.Error);
        }
        let AppointmentsBE = result.BusinessData['AppointmentsBE'] as AppointmentsBE;
        return AppointmentsBE;
      }).catch(this.commonService.handleError);
  }

}

