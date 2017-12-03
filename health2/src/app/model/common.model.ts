import { AnonymousSubject } from "rxjs/Subject";

export interface IContextInformation  {
     Culture?: string;
     ProviderNameWithCultureInfo?: string;
     HostName?:string;
     HostIp?:string;
     HostTime: Date;
     ServerName: string;
     ServerTime?: Date;
     UserName?: string;
     UserId?: string;
     AppId: string;
     ProviderName: string;
}
export class ContextInformation implements IContextInformation  {
    Culture?: string;
    ProviderNameWithCultureInfo?: string;
    HostName?:string;
    HostIp?:string;
    HostTime: Date;
    ServerName: string;
    ServerTime?: Date;
    UserName?: string;
    UserId?: string;
    AppId: string;
    ProviderName: string;
}
export interface IRequest{
    
    SecurityProviderName?: string;
    Encrypt?: boolean;
    //Error?:ServiceError;
    ServiceName?: string;
    BusinessData?:object;
    CacheSettings?:object;
    ContextInformation:IContextInformation;
}

export interface IResponse{
    
    SecurityProviderName?: string;
    Encrypt?: boolean;
    Error?:ServiceError;
    ServiceName?: string;
    BusinessData?:object;
    CacheSettings?:object;
    ContextInformation:IContextInformation;
}
export class Result implements IResponse {
    
    SecurityProviderName?: string;
    Encrypt?: boolean;
    Error?:ServiceError;
    ServiceName?: string;
    BusinessData?:object;
    CacheSettings?:object;
    ContextInformation:ContextInformation;
}
export class Request implements IRequest{
  
    SecurityProviderName?: string;
    Encrypt?: boolean;
    Error?:object;
    ServiceName?: string;
    BusinessData?:object;
    CacheSettings?:object;
    ContextInformation:ContextInformation;
}
export interface IParam
{
    IdParametro: number;
    Nombre:string;
    Descripcion:string;
    IdTipoParametro:number;
    IdParametroRef?:number;
}
export class Param {
    IdParametro: number;
    Nombre:string;
    Descripcion:string;
    IdTipoParametro:number;
    IdParametroRef?:number;
    

}

  /// Contiene informacion del error de un servicio.-
  // if(e instanceof EvalError)
export class ServiceError extends Error{


   Message:string;
   StackTrace:string;
   Type:string;
   Machine:string;


}


export class FwkEvent{
    Message : string;
    Source : string;
    Machine :string;
    LogDate : Date;
    Type : string;  
    User:string;
}

export class User {
    public Username: string;
    public Password: string;
    public FirstName: string;
    public LastName: string;
    public Email:string;

    public  AnswerPassword :String;
    public  AppName :String;
    public  Comment :String;
    
    public  CreationDate? : Date ;
    public  DNI :String;

    
    public  IsApproved :Boolean;
    public  IsLockedOut :Boolean;
    public  LastActivityDate? : Date ;
    public  ModifiedDate? : Date ;
    public ModifiedByUserId?:number;
    public  MustChangePassword? : Boolean ;
    public  ProviderId: any;
    public  QuestionPassword :String;
    public  Roles :String[];
    public  UserId? :number;
    
    //public void AddRoles(RolList rolList);

    public  GetRolList():Rol[]{

        var roles:Rol[];
        
        return roles;
    }
    
}

export class Rol{

    public  RolName: String;
    public  Description :String;

}
export class HealthInstitutionBE{

    public  HealthInstitutionId :String;
    public  HealthInstitutionType?  : number;
    public  Street  :String;
    public  StreetNumber?:number;
    public  Floor:String;
    public CountryId? :number;
    public ProvinceId? :number;
    public CityId? :number;
    public  RazonSocial :String;
    public  Province :String;
    public  City :String;
    public  Neighborhood :String;
    public  ZipCode :String;
    public  CreatedDate :Date;
    public  LastAccessTime? :Date;
    public  LastAccessUserId? :String;
    public  ActivationKey :String;
    public  Description :String;
    public  CUIT :String;
    public  HealthInstitutionIdParent? :String;
}


export class HelperBE{
    public  getFullName(name:String, lastName:String) {
        return lastName + ', ' + name;
    }
}


