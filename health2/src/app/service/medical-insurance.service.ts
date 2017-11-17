import { Injectable, Inject } from '@angular/core';
import { PatientBE,MutualPorPacienteBE,PersonBE ,MutualBE} from '../model/index';
import { Param, IParam, IContextInformation, IRequest, IResponse, Result } from '../model/common.model';
import { HealtConstants, contextInfo } from "../model/common.constants";
import { Http, Response, RequestOptions, Headers, URLSearchParams } from '@angular/http';

//permmite cambiar la variable obsevada
import { Subject } from 'rxjs/Subject';
//permite observar
import { Observable } from 'rxjs/Observable';
import { CommonService } from '../service/common.service';
import 'rxjs/add/operator/map';

@Injectable()
export class MedicalInsuranceService {

  private contextInfo: IContextInformation;
  private commonService: CommonService;
  constructor(private http: Http, @Inject(CommonService) commonService: CommonService) {
    this.contextInfo = contextInfo;
    this.commonService = commonService;
  }

  retriveAllObraSocialService$(status:string): Observable<MutualBE[]> {
    
        var bussinesData = {
          Status: status,
          StartDate: new Date()
          
        };
    
       
        let searchParams: URLSearchParams = this.commonService.generete_get_searchParams("RetriveAllObraSocialService", bussinesData);
        
        HealtConstants.httpOptions.search = searchParams;
    
        
        return this.http.get(`${HealtConstants.HealthExecuteAPI_URL}`, HealtConstants.httpOptions)
          .map(function (res: Response) {
    
            let result: Result = JSON.parse(res.json());
            
            if (result.Error) {
              Observable.throw(result.Error)
            }
    
            let MutualList: MutualBE[] = result.BusinessData["ObraSocialList"] as MutualBE[];
  
    
            return MutualList;
          }).catch(this.commonService.handleError);
          
      }
    
      getObraSocialPorPatientService$(status:string,startDate: Date): Observable<MutualPorPacienteBE[]> {
        
            var bussinesData = {
              Status: status,
              StartDate: startDate
            };
            HealtConstants.httpOptions.search = this.commonService.generete_get_searchParams("GetObraSocialPorPatientService", bussinesData);
            
            return this.http.get(`${HealtConstants.HealthExecuteAPI_URL}`, HealtConstants.httpOptions)
              .map(function (res: Response) {
        
                let result: Result = JSON.parse(res.json());
        
                if (result.Error) {
                  this.commonService.handleErrorObservable(result.Error);
                }
        
                let list: MutualPorPacienteBE[] = result.BusinessData as MutualPorPacienteBE[];
        
                return list;
              }).catch(this.commonService.handleError);
          }

          updateObraSocialService$(mutualBE:MutualBE): Observable<any> {
            
                var bussinesData = mutualBE;
               
                HealtConstants.httpOptions.search = this.commonService.generete_get_searchParams("UpdateObraSocialService", bussinesData);
                
                return this.http.get(`${HealtConstants.HealthExecuteAPI_URL}`, HealtConstants.httpOptions)
                  .map(function (res: Response) {
            
                    let result: Result = JSON.parse(res.json());
            
                    if (result.Error) {
                      this.commonService.handleErrorObservable(result.Error);
                    }

                    return "Ok";
                  }).catch(this.commonService.handleError);
              }
              createObraSocialService$(mutualBE:MutualBE): Observable<number> {
            
                var bussinesData =    {Mutual:mutualBE};
               
                HealtConstants.httpOptions.search = this.commonService.generete_get_searchParams("CreateObraSocialService", bussinesData);
                
                return this.http.get(`${HealtConstants.HealthExecuteAPI_URL}`, HealtConstants.httpOptions)
                  .map(function (res: Response) {
            
                    let result: Result = JSON.parse(res.json());
            
                    if (result.Error) {
                      this.commonService.handleErrorObservable(result.Error);
                    }
                    let id: number = result.BusinessData["IdMutual"] as number;
                    return id;
                  }).catch(this.commonService.handleError);
              }
            
          
          
}
