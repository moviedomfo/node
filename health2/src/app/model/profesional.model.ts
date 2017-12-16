import { PersonBE } from '../model/persons.model';
import { HelperBE, HealthInstitutionBE ,User} from '../model/common.model';
import { DayNamesIndex_Value_ES } from "./common.constants";
//import {Enumerable} from 'typescript-dotnet-es6/System.Linq/Linq';
export class ProfesionalBE {
    constructor() { }
    public IdProfesional: number;
    public IdPersona: number;
    public IdEspecialidad: number;
    public IdProfesion: number;

    public Matricula: string;

    public FechaAlta: Date;
    public LastAccessTime: Date;
    public LastAccessUserId: string;
    public LastHealthInstId: string;

    public NombreEspecialidad: String;
    public UserName: String;
    public UpdateSecurityInfo: Boolean;
    public Persona: PersonBE;
    public Roles: String[];

    public getFullName() {

        if (this.Persona) {
            let h: HelperBE = new HelperBE();

            return h.getFullName(this.Persona.Nombre, this.Persona.Apellido);
        }
        else { return ''; }
    }
}

export class Profesional_FullViewBE {
    constructor() { }
    public IdProfesional: number;
    public IdPersona: number;
    public IdEspecialidad: number;
    public NombreEspecialidad: String;
    public IdProfesion: number;
    public NombreProfecion: String;
    public Matricula: string;

    public UserId: String;
    public UserName: String;

    public Apellido: String;
    public Nombre: String;
    public NroDocumento: String;
    public TipoDocumento: String;
    public Sexo: String;






    public IdEstadocivil: number;

    public FechaNacimiento: Date;

    // Street
    // StreetNumber
    // Floor
    // CountryId
    // CityId

    public Foto: ArrayBuffer;
    public mail: String;
    public Info(): String {


        let inf = this.ApellidoNombre() + ", Especialidad:" + this.NombreEspecialidad + ' Profesión:' + this.NombreProfecion;

        return inf;

    }

    public ApellidoNombre(): String {


        let h: HelperBE = new HelperBE();

        return h.getFullName(this.Nombre, this.Apellido);


    }


    public FechaAlta: Date;
    public LastAccessTime: Date;
    public LastAccessUserId: string;
    public LastHealthInstId: string;

}


export class HealthInstitution_ProfesionalBE {


    public HealthInstitutionId: String;

    public ProfesionalId: number;
    public UserId: String;
    public ActiveFlag: Boolean;
    public IsLockedOut: Boolean;
    public IsAdmin: Boolean;
    public IsOwner: Boolean;

    public LastAccessTime?: Date;
    public LastAccessUserId?: string;

    public HealthInstitution: HealthInstitutionBE;
}


export class ResourceSchedulingBE{
    public IdSheduler:number;
    public DateStart?: Date;
    public DateEnd: Date;

    public Description:string;
    public ResourceId?:number;

    public WeekOfMonth?:number;
    public WeekDays?:number;
    public Duration?:number;

    
    
    public CreationUserId:string;
    public UpdateUserId:string;

    public ResourceType?:number;

    public TimeStart:string;
    public TimeEndt:string;

    
    public TimeStart_timesp:string;
    public TimeEnd_timesp:string;



    public HealthInstitutionId?: String;


//Retorna un array binario con los dias en comun: 
//a = 111110
        // b = 010101
        // res=111111
    public GetCommonDays (a:Boolean[],  b:Boolean[]):Boolean[]
    {
        for (var  i = 0; i < a.length; i++)
        {
            b[i] = a[i] || b[i];
        }

        return b;
    }
    public Get_WeekDays_BinArray (): Boolean[]
    {
        
            if (!this.WeekDays)
                this.WeekDays = 0;
            if (!this.weekDays_BinArray)
                this.weekDays_BinArray = this.CreateBoolArray(this.WeekDays);
            return this.weekDays_BinArray;
        

    }
    
    public  weekDays_BinArray:Boolean[] ;

    //ejemplo "Miercoles|Jueves|Viernes"
    public WeekDays_List:String;

    //  private   GetDayNames():String {
    //     var weekdays_to_bin_Array :Boolean[] = CreateBoolArray(this.WeekDays.valueOf);
    //     return GetDayNames(weekdays_to_bin_Array);
    // }

    private getDayNames():string[] {
        var days: string[]=[];
        if(!this.weekDays_BinArray)
          this.weekDays_BinArray = this.CreateBoolArray(this.WeekDays);

        for (let i: number = 0; i <= this.weekDays_BinArray.length-1; i++) {
  
          var dayName: string;
  
         // alert('push  ' + this.stackk[i]  + ' to ' + days);
          //console.log('push  ' + this.stackk[i]  + ' to ' + days);
          
           if (this.weekDays_BinArray[i]) {
             dayName = DayNamesIndex_Value_ES.find(d => d.index === i).name;
             days.push(dayName);
            
           }
        }
        return days;
      }
       
        /// Crea vector booleano y rellena hasta 7 con false en caso de no existir
        /// Resultado Valor
        //  index    6    5     4     3     2    1    0
        //          Sab   Vier   Jue  Mie   Mar  Lun    Dom
        /// 0000100	false,false,false,false,true,false,false = 4 --> Martes
        /// 0000101 false,false,false,false,true,false,true  = 5 --> Martes , Dom
        /// 0000110	false,false,false,false,true,true,false  = 6 --> Martes , Lunes
        /// 0000111	7
        /// 0001000	8
        /// 0001001	9
        /// 0001010	10
        private CreateBoolArray(weekdays: number): Boolean[] {
            let stack = [];
            let stackInvertida:Boolean[] = [];
            var weekdays_to_bin = Number(weekdays).toString(2);
      
            var weekdays_to_bin_Array = weekdays_to_bin.split('');
      
            let val: Boolean;
            //Recorro el vector desde atras y los voy metiendo en la pila
            for (let i: number = weekdays_to_bin_Array.length - 1; i >= 0; i--) {
              //s = weekdays_to_bin_Array[i].ToString();
              val = weekdays_to_bin_Array[i] === '1' ? true : false;
              //bool val = Convert.ToBoolean(Convert.ToInt16(weekdays_to_bin_Array[i]));
              stack.push(val);
            }
      
       
            //Completo la pila con con falses hasta llegar a 7 posiciones (i < 7 - weekdays_to_bin_Array.Length)
            //Es desir: Si weekdays_to_bin_Array tiene =  11 dado q weekdays fue 3 completo la pila con 11+00000,
            for (let i: number = 0; i < 7 - weekdays_to_bin_Array.length; i++) {
              stack.push(false);
            }
      
          //invierto stack asi me queda : 0000011 o false,false,false,false,false,true,true
            
            for (let i: number = stack.length-1; i >=0; i--) {
                stackInvertida.push(stack[i]);
              }
        
            return stackInvertida;
      
          }
}

export class GetProfesionalRes{
    public ProfesionalBE :ProfesionalBE;
    public ResourceSchedulingList :ResourceSchedulingBE[];
    public HealthInstitution_ProfesionalBE :HealthInstitution_ProfesionalBE;
    public User:User;
    public HealthInstitution_ProfesionalList :HealthInstitution_ProfesionalBE[];

}