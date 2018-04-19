import { Injectable, Inject } from '@angular/core';
import { Subject } from 'rxjs/Subject';
import { Observable } from 'rxjs/Observable';
import { Http, Response, RequestOptions, Headers, URLSearchParams } from '@angular/http';
import {PersonBE} from '../../app/model/persons.model'
import { HealtConstants, contextInfo } from "../model/common.constants";
import { Param, IParam, IContextInformation, IRequest, IResponse, Result, User, Rol } from '../model/common.model';
import { CommonService } from '../service/common.service';


@Injectable()
export class TestService {

  constructor(private http: Http,private commonService: CommonService) { }



  public execute(){
    let url ='http://localhost:63251/api/test/execute/'
    return this.http.get(url, HealtConstants.httpOptions)
    .map(function (res: Response) {

      let result: Result = JSON.parse(res.json());

      if (result.Error) {
        console.log(result.Error);
        throw Observable.throw(result.Error);
      }
      console.log(result);
      return result;
      
    }).catch(this.commonService.handleError);
  }
}


