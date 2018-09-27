import { Http, Response, RequestOptions, Headers } from '@angular/http';

import { HttpHeaders } from '@angular/common/http';
let header_httpClient_contentTypeJson = new HttpHeaders({  });
     header_httpClient_contentTypeJson.append('Access-Control-Allow-Methods', '*');
     header_httpClient_contentTypeJson.append('Access-Control-Allow-Headers', 'Content-Type, Access-Control-Allow-Headers, Authorization, X-Requested-With');
     
     header_httpClient_contentTypeJson.append('Access-Control-Allow-Origin', '*');
     
// let header_httpClient_form_urlencoded = new HttpHeaders({ 'Content-Type': 'application/x-www-form-urlencoded' });
//     header_httpClient_form_urlencoded.append('Access-Control-Allow-Methods', '*');
//     header_httpClient_form_urlencoded.append('Access-Control-Allow-Headers', 'Content-Type, Access-Control-Allow-Headers, Authorization, X-Requested-With');
//     header_httpClient_form_urlencoded.append('Access-Control-Allow-Origin', '*');
export  const HealtConstants={

    HealthAPI_URL:"http://localhost:8101/api/",
    HealthOAuth_URL:"http://localhost:63251/oauth/token",
   
    //httpOptions:options,
    
    httpClientOption_contenttype_json:{headers:header_httpClient_contentTypeJson}

}

export class resultRedditNews{
    public kind :string;
    public data :childrenList;
}


export class childrenList{
    public kind :string;
    public children :childrenBE[];
}
export class childrenBE{
    public kind :string;
    public data :NewsBE;

}


export class NewsBE {//implements IPatient {
    constructor(){}
    public name: string;
    public thumbnail: string;
    public title: string;
    public selftext :string;

    public created: number;


}


  /// Contiene informacion del error de un servicio.-
  // if(e instanceof EvalError)
  export class ServiceError extends Error{


    Message:string;
    StackTrace:string;
    Type:string;
    Machine:string;
 Status:number;
 
 }