import { Injectable, Inject } from '@angular/core';
import { PatientBE,MutualPorPacienteBE,PersonBE ,MutualBE} from '../model/index';
import { Param, IParam, IContextInformation, IRequest, IResponse, Result } from '../model/common.model';
import { HealtConstants, contextInfo } from "../model/common.constants";
import {  Response, RequestOptions, Headers } from '@angular/http';

//permmite cambiar la variable obsevada
import { Subject } from 'rxjs/Subject';
//permite observar
import { Observable } from 'rxjs/Observable';
import { CommonService } from '../service/common.service';
import { HttpClient } from '@angular/common/http';
import 'rxjs/add/operator/map';

@Injectable()
export class MedicalInsuranceService {

  private contextInfo: IContextInformation;
  private commonService: CommonService;
  
  constructor(private http: HttpClient, @Inject(CommonService) commonService: CommonService) {
    
        this.contextInfo = contextInfo;
        this.commonService = commonService;
    }
      
 
    
  retriveAllObraSocialService$(status:string): Observable<MutualBE[]> {
    
        var bussinesData = {
          Status: status,
          StartDate: new Date()
          
        };
    
        let executeReq=  this.commonService.generete_post_Params("RetriveAllObraSocialService", bussinesData);
    
        
        return this.http.post(`${HealtConstants.HealthExecuteAPI_URL}`,executeReq, HealtConstants.httpClientOption_contenttype_json)
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
            
            let executeReq=  this.commonService.generete_post_Params("GetObraSocialPorPatientService", bussinesData);
            return this.http.post(`${HealtConstants.HealthExecuteAPI_URL}`,executeReq, HealtConstants.httpClientOption_contenttype_json)
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
               
                
                let executeReq=  this.commonService.generete_post_Params("UpdateObraSocialService", bussinesData);
                return this.http.post(`${HealtConstants.HealthExecuteAPI_URL}`,executeReq, HealtConstants.httpClientOption_contenttype_json)
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
                let executeReq=  this.commonService.generete_post_Params("CreateObraSocialService", bussinesData);
                return this.http.post(`${HealtConstants.HealthExecuteAPI_URL}`,executeReq ,HealtConstants.httpClientOption_contenttype_json)
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
