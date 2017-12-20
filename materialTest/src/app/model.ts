
import { Enumerable} from 'typescript-dotnet-umd/System.Linq/Linq';
import { TimeSpam} from 'typescript-dotnet-umd/System/Time';
//import { TimeSpam} from 'typescript-dotnet-umd/TimeSpam';
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

    
    public TimeStart_timesp:TimeSpam;
    public TimeEnd_timesp:TimeSpam;



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