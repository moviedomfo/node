import { AnonymousSubject } from "rxjs/Subject";
/*********************************************************
 
.Net like TimeSpan class in typescript
 
Author: Ran Wahle
 
 
*********************************************************/
const MILLISECONDS_IN_A_SECOND: number = 1000;
const SECONDS_IN_A_MINUTE: number = 60;
const MINUTES_IN_AN_HOUR: number = 60;
const HOURS_IN_A_DAY: number = 24;
const DAYS_IN_A_WEEK: number = 7;
const DAYS_IN_A_MONTH: number = 30;
const DAYS_IN_A_YEAR: number = 365;
 
const MILLISECONDS_IN_A_MINUTE = MILLISECONDS_IN_A_SECOND * SECONDS_IN_A_MINUTE;
const MILLISECONDS_IN_AN_HOUR = MILLISECONDS_IN_A_MINUTE * MINUTES_IN_AN_HOUR;
const MILLISECONDS_IN_A_DAY = MILLISECONDS_IN_AN_HOUR * HOURS_IN_A_DAY;
const MILLISECONDS_IN_A_WEEK = MILLISECONDS_IN_A_DAY * DAYS_IN_A_WEEK;
const MILLISECONDS_IN_A_MONTH = MILLISECONDS_IN_A_DAY * DAYS_IN_A_MONTH;
const MILLISECONDS_IN_A_YEAR = MILLISECONDS_IN_A_DAY * DAYS_IN_A_YEAR;
 
const UNITS = {
    SECOND: 'second',
    MINUTE: 'minute',
    HOUR: 'hour',
    DAY: 'day',
    WEEK: 'week',
    MONTH: 'month',
    YEAR: 'year'
};
 
interface DivisionResult {
    modulu: number;
    addition: number;
}
 

       
       

 

export class TimeSpan{

    public  TicksPerDay :number = 864000000000;
    public  TicksPerHour      :number = 36000000000;
    public  TicksPerMillisecond :number = 10000;
    public  TicksPerMinute :number = 600000000;
    public  TicksPerSecond :number = 10000000;

    public Fecha:Date;
    public Milliseconds:number;
    
    
    
    public TotalMilliseconds:number;
    public TotalDays:number;
    public TotalHours:number;
    public TotalMinutes:number;
    public TotalSeconds:number;
    
    public Tick:number;
    constructor(ticks?:number){

   }
   
    Parse(dd: number, hhmmss: string) {

        var today= Date.now();
        var day: Date = new Date();
        let hhmmArray = hhmmss.split(':');
        let hh: number = 0;
        let mm: number = 0;
        let ss: number = 0;

        if (hhmmArray.length > 0) {
            hh = Number.parseInt(hhmmArray[0]);
        }
        if (hhmmArray.length > 1) {
            mm = Number.parseInt(hhmmArray[1]);
        }

        if (hhmmArray.length > 2) {
            ss = Number.parseInt(hhmmArray[2]);
        }

        this.Fecha = new Date(day.getFullYear(), day.getMonth(), day.getDate(), hh, mm, ss, 0);
        alert(this.Fecha.getDate());
        alert(this.Fecha.getHours());
        alert(this.Fecha.getSeconds());
        alert(this.Fecha.getMilliseconds());
        let fechaInicio: Date = new Date(1, 1, 1, 0, 0, 0);

        this.TotalMilliseconds = this.Fecha.getTime() - fechaInicio.getTime();

        //this.TotalMilliseconds = this.Fecha.valueOf() - fechaInicio.valueOf();

        this.Tick = this.TotalMilliseconds * this.TicksPerMillisecond;


        this.TotalSeconds = this.TotalMilliseconds / 1000;
        this.TotalMinutes = this.TotalSeconds / 60;
        this.TotalHours = this.TotalMinutes / 60;
        this.TotalDays = this.TotalHours / 24;


        //this.Fecha= new Date( day.getFullYear(),day.getMonth(),day.getDate(),hh,mm,0,0) ;

        //this.Milliseconds = (this.TicksPerDay/this.TicksPerMillisecond ) - this.Fecha.getTime();

        //this.Tick = Math.round(this.Fecha.getTime()/1000)
    }
   
     setDate(d:Date)
   {
    this.Fecha=d;
    this.Milliseconds = new Date().getTime();

    this.Tick = Math.round(this.Fecha.getTime()/1000)
   }
}

export class chkDays {
    public chkDomingo: boolean  = false;
    public chkLunes: boolean  = false;
    public chkMartes: boolean  = false;
    public chkMiercoles: boolean  = false;
    public chkJueves: boolean  = false;
    public chkViernes: boolean  = false;
    public chkSabado: boolean  = false;
    public chkTodos: boolean  = false;
  }
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

    public  AnswerPassword :string;
    public  AppName :string;
    public  Comment :string;
    
    public  CreationDate? : Date ;
    public  DNI :string;

    
    public  IsApproved :boolean ;
    public  IsLockedOut :boolean ;
    public  LastActivityDate? : Date ;
    public  ModifiedDate? : Date ;
    public ModifiedByUserId?:number;
    public  MustChangePassword? : boolean  ;
    public  ProviderId: any;
    public  QuestionPassword :string;
    public  Roles :string[];
    public  UserId? :number;
    
    //public void AddRoles(RolList rolList);

    public  GetRolList():Rol[]{

        var roles:Rol[];
        
        return roles;
    }
    
}

export class Rol{

    public  RolName: string;
    public  Description :string;

}
export class HealthInstitutionBE{

    public  HealthInstitutionId :string;
    public  HealthInstitutionType?  : number;
    public  Street  :string;
    public  StreetNumber?:number;
    public  Floor:string;
    public CountryId? :number;
    public ProvinceId? :number;
    public CityId? :number;
    public  RazonSocial :string;
    public  Province :string;
    public  City :string;
    public  Neighborhood :string;
    public  ZipCode :string;
    public  CreatedDate :Date;
    public  LastAccessTime? :Date;
    public  LastAccessUserId? :string;
    public  ActivationKey :string;
    public  Description :string;
    public  CUIT :string;
    public  HealthInstitutionIdParent? :string;
}


export class HelperBE{
    public  getFullName(name:string, lastName:string) {
        return lastName + ', ' + name;
    }
}


