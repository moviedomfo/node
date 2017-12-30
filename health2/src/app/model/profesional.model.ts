import { PersonBE } from '../model/persons.model';
import { HelperBE, HealthInstitutionBE, User, TimeSpan } from '../model/common.model';
import { DayNamesIndex_Value_ES, AppoimantsStatus_SP, AppoimantsStatus_SP_type, WeekDays_EN, DayOfWeek, HealtConstants } from "./common.constants";


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

    public NombreEspecialidad: string;
    public UserName: string;
    public UpdateSecurityInfo: boolean;
    public Persona: PersonBE;
    public Roles: string[];

    public getFullName() {

        if (this.Persona) {
            let h: HelperBE = new HelperBE();

            return h.getFullName(this.Persona.Nombre, this.Persona.Apellido);
        }
        else { return ''; }
    }
}

export class ProfesionalesGridBE {
    constructor() { }
    public IdProfesional: number;
    public IdPersona: number;
    public Matricula: string;
    public FechaAlta: Date;
    public Apellido: string;
    public Nombre: string;
    public Sexo: string;
    public IdEspecialidad: number;
    public NombreEspecialidad: string;
    public NroDocumento: string;
    public TipoDocumento: string;
    public UserName: string;
    public UserId: string;
    public IdEstadocivil: number;

    public FechaNacimiento: Date;
    public Street: string;
    public StreetNumber: number;
    public Floor: string;

    public mail: string;
    public Telefono1: string;
    public Telefon2: string;
    public Foto: ArrayBuffer;

    public NombreProfecion: string;
    public IdProfesion: number;

}
export class Profesional_FullViewBE {
    constructor() { }
    public IdProfesional: number;
    public IdPersona: number;
    public IdEspecialidad: number;
    public NombreEspecialidad: string;
    public IdProfesion: number;
    public NombreProfecion: string;
    public Matricula: string;

    public UserId: string;
    public UserName: string;

    public Apellido: string;
    public Nombre: string;
    public NroDocumento: string;
    public TipoDocumento: string;
    public Sexo: string;


    public IdEstadocivil: number;

    public FechaNacimiento: Date;

    // Street
    // StreetNumber
    // Floor
    // CountryId
    // CityId

    public Foto: ArrayBuffer;
    public mail: string;
    public Info(): string {


        let inf = this.ApellidoNombre() + ", Especialidad:" + this.NombreEspecialidad + ' Profesión:' + this.NombreProfecion;

        return inf;

    }

    public ApellidoNombre(): string {


        let h: HelperBE = new HelperBE();

        return h.getFullName(this.Nombre, this.Apellido);


    }


    public FechaAlta: Date;
    public LastAccessTime: Date;
    public LastAccessUserId: string;
    public LastHealthInstId: string;

}


export class HealthInstitution_ProfesionalBE {


    public HealthInstitutionId: string;

    public ProfesionalId: number;
    public UserId: string;
    public ActiveFlag: boolean;
    public IsLockedOut: boolean;
    public IsAdmin: boolean;
    public IsOwner: boolean;

    public LastAccessTime?: Date;
    public LastAccessUserId?: string;

    public HealthInstitution: HealthInstitutionBE;
}

export class AppointmentsFullViewBE {

}
export class AppointmentsBE {
    public AppointmentId: number;
    public Start?: Date;
    public End?: Date;
    public Description: string;
    public Location: string;
    public ResourceId?: number;
    public Status?: number;
    public Subject: string;
    public Label?: number;
    public AllDay?: boolean;
    public DayNumber?: number;
    public WeekOfMonth?: number;
    public WeekDays?: number;
    public OccurrenceCount?: number;
    public Periodicity?: number;
    public Range?: number;
    public Duration?: number;
    public Month?: number;

    public CreationDate?: Date;
    public UpdatedDate?: Date;
    public CreationUserId?: string;
    public UpdateUserId?: string;
    public HealthInstitutionId?: string;

    public IsExceptional: boolean;


    //Extension

    public TipoRecepcionNombre: string;
    public IdTipoRecepcion?: string;
    // public ProfesionalAppointment:ProfesionalAppointmentBE;
    //public Consulta:ConsultaBE;
    //Start.Value.Ticks
    public TimeStart_timesp: TimeSpan;
    //End.Value.Ticks
    public TimeEnd_timesp: TimeSpan;

    //Hora de inicio HH:MM
    //return String.Concat(TimeStart_timesp.ToString("hh"), ":", TimeStart_timesp.ToString("mm"));
    public TimeStart: String;
    //Hora Fin HH:MM get { return String.Concat(TimeEnd_timesp.ToString("hh"), ":", TimeEnd_timesp.ToString("mm")); }
    public TimeEnd: String;
}

/// <summary>
/// Representa un intervalo de tiempo puntual generado a partir del la programacion de turnos del Profesional.
/// Una lista de TimespamView por ejemplo podria representar los intervalos de tiempo de disponibilidad 
/// horaria para un prefecional en un dia determinada y turno determinado
/// 
/// Este elemento es utilizado para rellenar las grillas donde aparecen los turnos otorgados y turnos disponible.
/// Un turno disponible es un turno inexistente o un turno no registrado en la base de datos.
/// </summary>
export class TimespamView {


    constructor(date?: Date) {
        //Menor que cero t1 es menor que t2.:Da
        //Para fechas date anterior a hoy no se usa nowTicks
        if (!date) {
            date = new Date();
        }

        //El pasado u hoy
        if (date <= new Date())
            this.nowTicks = date.getMilliseconds();
        //Futuro Siempre esta libre siempre y cuando no esta en otro estado
        if (date > new Date())
            this.nowTicks = -1;
    }

    public IsExceptional: boolean;

    public Description: string;
    public Appointment: AppointmentsBE;
    public Name: string;
    public Time: TimeSpan;

    public TimeString: string;




    public Duration: number;
    private nowTicks?: number = null;


    private status: number;

    get Status(): number {
        return this.GetStatus();
    }
    set Status(s: number) {
        this.status = s;
    }

    public GetStatus(): number {
        if (!this.Appointment)
            return this.Appointment.Status;

        if (!this.nowTicks)
            return AppoimantsStatus_SP.Nulo;

        if (this.nowTicks == -1) return AppoimantsStatus_SP.Libre;

        //Si tiempo final del TimespamView es mayor a ahora elta libre
        let t: number = 0;
        //let t:number = Time.Add(TimeSpan.FromMinutes(Duration)).Ticks;


        if (this.nowTicks < t)
            return AppoimantsStatus_SP.Libre;
        else
            return AppoimantsStatus_SP.Nulo;
    }
}

export class ResourceSchedulingBE {

  constructor (){
      
      this.WeekDays = 0;
      this.DateStart = null;
      this.DateEnd = null;
      this.Duration = 30;
      this.Description = '';
      this.TimeStart = '08:30';
      this.TimeEnd = '18:30';
      this.TimeStart_timesp = TimeSpan.FromHHMM('08:30');
      this.TimeEnd_timesp = TimeSpan.FromHHMM('08:30');
      this.HealthInstitutionId = HealtConstants.DefaultHealthInstitutionId;
      this.Generate_Attributes();

  }
    public IdSheduler: number;
    public DateStart?: Date;
    public DateEnd: Date;

    public Description: string;
    public ResourceId?: number;

    public WeekOfMonth?: number;
    public WeekDays?: number;
    public Duration?: number;
    public CreationUserId: string;
    public UpdateUserId: string;
    public ResourceType?: number;
    public HealthInstitutionId?: string;
    public TimeStart: string;
    public TimeEnd: string;
    private timeStart_timesp: TimeSpan;
    get TimeStart_timesp(): TimeSpan {
        this.timeStart_timesp = new TimeSpan(null);
        this.timeStart_timesp.Set_hhmmss(this.TimeStart);
        return this.timeStart_timesp;
    }
    set TimeStart_timesp(s: TimeSpan) {
        this.timeStart_timesp = s;
    }

    private timeEnd_timesp: TimeSpan;
    get TimeEnd_timesp(): TimeSpan {
        this.timeEnd_timesp = new TimeSpan(null);
        this.timeEnd_timesp.Set_hhmmss(this.TimeEnd);
        return this.timeStart_timesp;
    }
    set TimeEnd_timesp(s: TimeSpan) {
        this.timeEnd_timesp = s;
    }
    public weekDays_BinArray: boolean[];

    //ejemplo "Miercoles|Jueves|Viernes"
    public WeekDays_List: string;

    public Generate_Attributes(){
        
        this.weekDays_BinArray= this.Get_WeekDays_BinArray();
        
        //console.log('this.weekDays_BinArray = ' + this.weekDays_BinArray);
        this.WeekDays_List = this.getDayNames().join("|");
        //console.log('this.WeekDays_List = ' + this.WeekDays_List);
        this.timeStart_timesp = new TimeSpan(null);
        this.timeStart_timesp.Set_hhmmss(this.TimeStart);
        
        this.timeEnd_timesp = new TimeSpan(null);
        this.timeEnd_timesp.Set_hhmmss(this.TimeEnd);
        
    }
    //Retorna un array binario con los dias en comun: 
    //a = 111110
    // b = 010101
    // res=111111
    public GetCommonDays(a: boolean[], b: boolean[]): boolean[] {
        for (var i = 0; i < a.length; i++) {
            b[i] = a[i] || b[i];
        }

        return b;
    }
    public Get_WeekDays_BinArray(): boolean[] {

        if (!this.WeekDays)
            this.WeekDays = 0;
        //if (!this.weekDays_BinArray)
        this.weekDays_BinArray = ResourceSchedulingBE.CreateBoolArray(this.WeekDays);
        return this.weekDays_BinArray;


    }



    //  private   GetDayNames():string {
    //     var weekdays_to_bin_Array :boolean   [] = CreateBoolArray(this.WeekDays.valueOf);
    //     return GetDayNames(weekdays_to_bin_Array);
    // }

    private getDayNames(): string[] {
        var days: string[] = [];
        if (!this.weekDays_BinArray)
            this.weekDays_BinArray = ResourceSchedulingBE.CreateBoolArray(this.WeekDays);

        for (let i: number = 0; i <= this.weekDays_BinArray.length - 1; i++) {

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
    static CreateBoolArray(weekdays: number): boolean[] {
        let stack = [];
        let stackInvertida: boolean[] = [];
        var weekdays_to_bin = Number(weekdays).toString(2);
        
        var weekdays_to_bin_Array = weekdays_to_bin.split('');
        
        let val: boolean;
        //Recorro el vector desde atras y los voy metiendo en la pila
        for (let i: number = weekdays_to_bin_Array.length - 1; i >= 0; i--) {
            //s = weekdays_to_bin_Array[i].ToString();
            val = weekdays_to_bin_Array[i] === '1' ? true : false;
            //bool val = Convert.Toboolean (Convert.ToInt16(weekdays_to_bin_Array[i]));
            stack.push(val);
        }


        //Completo la pila con con falses hasta llegar a 7 posiciones (i < 7 - weekdays_to_bin_Array.Length)
        //Es desir: Si weekdays_to_bin_Array tiene =  11 dado q weekdays fue 3 completo la pila con 11+00000,
        for (let i: number = 0; i < 7 - weekdays_to_bin_Array.length; i++) {
            stack.push(false);
        }

        //invierto stack asi me queda : 0000011 o false,false,false,false,false,true,true

        for (let i: number = stack.length - 1; i >= 0; i--) {
            stackInvertida.push(stack[i]);
        }

        return stackInvertida;

    }

    Get_ArrayOfTimes(date: Date): TimespamView[] {

        return ResourceSchedulingBE.Get_ArrayOfTimes(date, this.timeStart_timesp, this.TimeEnd_timesp, this.Duration, this.Description);
    }

    Get_ArrayOfTimes2(date: Date, chekWith: boolean): TimespamView[] {

        if (chekWith) {
            if (!this.Date_IsContained(date))
                return null;
        }
        return ResourceSchedulingBE.Get_ArrayOfTimes(date, this.timeStart_timesp, this.TimeEnd_timesp, this.Duration, this.Description);
    }

    static Get_ArrayOfTimes(currentDate: Date, start: TimeSpan, end: TimeSpan, duration: number, name: string): TimespamView[] {
        var aux: TimeSpan = new TimeSpan();

        //console.log('---------------------Get_ArrayOfTimes (' + duration+')');
        let wTimespamView: TimespamView;
        var times: TimespamView[] = [];
        wTimespamView = new TimespamView(currentDate);
        aux.Set_hhmmss(start.getHHMM());
        wTimespamView.Time = aux;
        wTimespamView.TimeString = wTimespamView.Time.getHHMM();
        //alert( start.Fecha.toISOString());
        times.push(wTimespamView);
        //wTimespamView = new TimespamView(currentDate);

        var t: TimeSpan = new TimeSpan();//=  Object.assign({}, start); 
        t.Set_hhmmss(start.getHHMM());
        let control: boolean = true;
        //  let count = 0;
        while (control) {

            //Para este algoritmo colaboro el cuero mrenaudo 
            //if ((end - t).TotalMinutes >= 0)

            if ((end.TotalMinutes - t.TotalMinutes) >= duration) {
                //count = count +1;
                //console.log(end.TotalMinutes + '-' + t.TotalMinutes + ' = '+ (end.TotalMinutes - t.TotalMinutes));
                //  if(count==20)
                //  {
                //     control = false    ;

                //  }

                //alert((end.TotalMinutes - t.TotalMinutes) .toString());
                wTimespamView = new TimespamView(null);
                wTimespamView.Duration = duration;
                wTimespamView.Name = name;
                aux = new TimeSpan();
                t.addMinutes(duration);
                aux.Set_hhmmss(t.getHHMM());

                wTimespamView.Time = aux;
                wTimespamView.TimeString = aux.getHHMM();
                times.push(wTimespamView);
                //console.log('t.addMinutes(duration) = ' + t.TotalMinutes);
            }
            else { control = false; }
        }
        // console.log('------------------------------------------------------------------------');
        return times;
    }

    /// <summary>
    /// Determina si el dia de la fecha [date] pertenece a la confuguracion [WeekDays] mediante operaciones logicas y binarias
    /// 
    /// </summary>
    /// <param name="date"></param>
    /// <returns></returns>
    private Date_IsContained(date: Date): boolean {
        var weekDay = WeekDays_EN.EveryDay;
        let dayOfWeek = date.getDay();

        switch (dayOfWeek) {
            case DayOfWeek.Monday://Lunes
                {
                    weekDay = WeekDays_EN.Monday;
                    break;
                }
            case DayOfWeek.Tuesday://Martes
                {
                    weekDay = WeekDays_EN.Tuesday;
                    break;
                }
            case DayOfWeek.Wednesday://Miercoles
                {
                    weekDay = WeekDays_EN.Wednesday;
                    break;
                }
            case DayOfWeek.Thursday://Jueves
                {
                    weekDay = WeekDays_EN.Thursday;
                    break;
                }
            case DayOfWeek.Friday://Viernes
                {
                    weekDay = WeekDays_EN.Friday;
                    break;
                }
            case DayOfWeek.Saturday://Sabado
                {
                    weekDay = WeekDays_EN.Saturday;

                    break;
                }
            case DayOfWeek.Sunday://Domingo
                {
                    weekDay = WeekDays_EN.Sunday;
                    break;
                }
        }
        var bin1: boolean[] = ResourceSchedulingBE.CreateBoolArray(weekDay);
        return ResourceSchedulingBE.Math(bin1, this.weekDays_BinArray);
    }


    /// <summary>
    /// 0000111
    /// 1000001 return True
    /// 
    /// 100000
    /// 000010 return False
    /// </summary>
    /// <param name="a"></param>
    /// <param name="b"></param>
    /// <returns></returns>
    static Math(a: boolean[], b: boolean[]): boolean {

        for (var i = 0; i < a.length; i++) {
            if (a[i] && b[i])
                return true;
        }

        return false;

    }

}

export class GetProfesionalRes {
    public ProfesionalBE: ProfesionalBE;
    public ResourceSchedulingList: ResourceSchedulingBE[];
    public HealthInstitution_ProfesionalBE: HealthInstitution_ProfesionalBE;
    public User: User;
    public HealthInstitution_ProfesionalList: HealthInstitution_ProfesionalBE[];

}