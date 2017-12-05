import { PersonBE } from '../model/persons.model';
import { HelperBE, HealthInstitutionBE ,User} from '../model/common.model';
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



    // public GetCommonDays (a:Boolean[],  b:Boolean[]):Boolean[]
    // {
    //     for (var  i = 0; i < a.length; i++)
    //     {
    //         b[i] = a[i] || b[i];
    //     }

    //     return b;
    // }

    
    public  weekDays_BinArray:Boolean[] ;

    public WeekDays_List:String;

    //  private   GetDayNames():String {
    //     var weekdays_to_bin_Array :Boolean[] = CreateBoolArray(this.WeekDays.valueOf);
    //     return GetDayNames(weekdays_to_bin_Array);
    // }


    // private CreateBoolArray (weekdays:number):Boolean[]{
    //     let stackk:Boolean[];
    //     return stackk;
    // }
}

export class GetProfesionalRes{
    public ProfesionalBE :ProfesionalBE;
    public ResourceSchedulingList :ResourceSchedulingBE[];
    public HealthInstitution_ProfesionalBE :HealthInstitution_ProfesionalBE;
    public User:User;
    public HealthInstitution_ProfesionalList :HealthInstitution_ProfesionalBE[];

}