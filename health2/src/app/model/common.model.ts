//import { AnonymousSubject } from "rxjs/Subject";
import * as moment from 'moment'
import { Duration } from "moment";




       
       

 

export class TimeSpan{



    public Fecha:Date;
    public Milliseconds:number;
   
    public Days:number;
    public Hours:number;
    public Minutes:number;
    public Seconds:number;

    public TotalMilliseconds:number;
    public TotalDays:number;
    public TotalHours:number;
    public TotalMinutes:number;
    public TotalSeconds:number;
    
    public Tick:number;
    private currentDuration:Duration;

    constructor(ticks?:number){

   }
   
   Set_hhmmss(hhmmss: string){

     var startDate = new Date( 1,0,1,0,0,0,0) ;
     let duration:Duration = moment.duration(hhmmss);

     var day = new Date();
     //alert(hhmmss +'  '+ duration.hours());
     this.Fecha = new Date( day.getFullYear(),day.getMonth(),day.getDate(),duration.hours(),duration.minutes(),duration.seconds(),duration.milliseconds()) ;
     
     //alert(hhmmss +'  '+ duration.hours() + ' fecha = ' + this.Fecha.toString());

     var startMomentDate = moment(startDate);
     var endMomentDate = moment(this.Fecha);//moment('1/1/2013', 'DD/MM/YYYY');
     //var days = endMomentDate.diff(startMomentDate, 'days');
 
     
     this.currentDuration = moment.duration(endMomentDate.diff(startMomentDate));

     this.setFromDuration( this.currentDuration );
    
   }

   setFromDuration( duration:Duration ){

    this.Days = duration.days();  //number of days in a duration
    this.Hours = duration.hours();
    // console.log('hours:' + this.Hours);
    this.Minutes = duration.minutes();
    // console.log('Minutes:' +this.Minutes);
    this.Seconds = duration.seconds();
    // console.log('Seconds:' +this.Seconds);
    this.Milliseconds = duration.milliseconds();  //number of milliseconds in a duration

    
    this.TotalDays = this.currentDuration.asDays();//The length of the duration in days,
    this.TotalHours = this.currentDuration.asHours();//The length of the duration in minutes
    this.TotalMinutes = this.currentDuration.asMinutes();
    this.TotalSeconds = this.currentDuration.asSeconds();
    this.TotalMilliseconds = this.currentDuration.asMilliseconds();
    
    this.hhmm=   moment(this.Fecha).format('HH:mm');
   }
   
    setDate(day: Date) {
        this.Fecha = day;
        var dayWrapper = moment(day);
        //'7.23:59:59.999'
        let duration:Duration = moment.duration(dayWrapper.day + '.' + dayWrapper.hour + ':' + + ':' + dayWrapper.minute + ':' + dayWrapper.second + '.' +  dayWrapper.milliseconds);
       
        this.setFromDuration(duration);
        
    }

    addMinutes(m:number)
    {
        //console.log('antes this.currentDuration.minutes == ' + this.currentDuration.minutes());
       this.currentDuration.add(m,'minutes');

       this.Fecha = new Date( 
             this.Fecha.getFullYear(),this.Fecha.getMonth(),this.Fecha.getDate(),
            this.currentDuration.hours(),
            this.currentDuration.minutes(),
            this.currentDuration.seconds(),
            this.currentDuration.milliseconds()) ;

  
        this.setFromDuration(this.currentDuration);
        // console.log('despues hh:mm == ' + this.currentDuration.hours() + ':' +  this.currentDuration.minutes());
        // console.log('despues hh:mm == ' + this.hhmm);
        // console.log('despues hh:mm == ' + this.getHHMM());
        // console.log('despues hh:mm == ' + moment(this.Fecha).format('HH:mm'));
    
    }
    
    public hhmm: string;

    // get HHMM(): string {
    //     return this.getHHMM();
    // }
  
    getHHMM(){
        return moment(this.Fecha).format('HH:mm');
         //return this.Hours + ':' + this.Minutes;//  moment(this.TotalMinutes,'minutes').format('hh:mm');
    }
    public static FromString(hhmmss:string)
    {
        var t :TimeSpan=new TimeSpan();
        t.Set_hhmmss(hhmmss);
        
        return t;
    }

    public static FromHHMM(hhmm:string)
    {
        var t :TimeSpan=new TimeSpan();
        
        t.Set_hhmmss(hhmm);
        return t;
    }

    public static FromMinutes(mm:number)
    {
        var t :TimeSpan=new TimeSpan();
        let duration:Duration = moment.duration(mm,'minutes');
        t.setFromDuration(duration);
        return t;
    }
    public static FromSeconds(s:number)
    {
        var t :TimeSpan=new TimeSpan();
        let duration:Duration = moment.duration(s,'seconds');
        t.setFromDuration(duration);
        return t;
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
export  class ExecuteReq
{
      serviceProviderName?: string;
  serviceName?: string;
  jsonRequest  ?: string;
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
Status:number;

}


export class FwkEvent{
    Message : string;
    Source : string;
    Machine :string;
    LogDate : Date;
    Type : string;  
    User:string;
}
export class AuthenticationOAutResponse {


    expires_in: number;
    access_token:string;
    token_type:string;
    refresh_token:string;
    
    

}
export class CurrentLogin{
    username:string;
    oAuth:AuthenticationOAutResponse;
}
export class User {
    public UserName: string;
    public Password: string;
    public confirmPassword: string;
    
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
    


    public  GetRolList():Rol[]{

        var roles:Rol[];
        
        return roles;
    }
    
}

export class Rol{

    Rol(){
        this.isChecked = false;
    }
    public  RolName: string;
    public  Description :string;
    public isChecked : boolean=false;

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


