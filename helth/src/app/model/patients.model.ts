import {PersonBE} from '../model/persons.model';


export interface IPatient  {
     PatientId: number;
     IdPersona: number;
    
     FechaAlta: Date;
     LastAccessTime: Date;
     LastAccessUserId: string;
     LastHealthInstId: string;
}

export class PatientBE {//implements IPatient {
    constructor(){}
    public PatientId: number;
    public IdPersona: number;
    public FechaAlta: Date;
    public LastAccessTime: Date;
    public LastAccessUserId: string;
    public LastHealthInstId: string;
    public Persona:PersonBE;
    public Mutuales : MutualPorPacienteBE[];
}

export class MutualBE{
    
    public IdMutual: number;
    public Nombre: string;
    public ExigeCoseguro: boolean;
    public CUIT: string;
    public LastAccessTime: Date;
    public LastAccessUserId: string;
    public LastHealthInstId: string;
    public MutualPlanList :MutualPlanGridView[];
}
export class MutualPorPacienteBE{
    public Id: number;
    public IdMutual: number;
    public PatientId: number;
    public PlanId: number;
    public NroAfiliadoMutual: string;
    public IsActive: boolean;

    //Extensiones de la clase
    public  EntityState :string;
    public  NombreMutual :string;
    public  NombrePlan : string;
    
}

export class MutualPlanGridView
{
    public MutualId : number;
    public Nombre : string;
    public  PlanId : number;
    public ComercialCode : string;
    //public int NroAfiliadoMutual { get; set; }

}
export class PatientAllergy {

     AllergyId: number;
     PatientId: number;
     FoodAllergy: Boolean;
     MedicamentsAllergy: boolean;
     MiteAllergy: Boolean;
     InsectAllergy: Boolean;
     PollenAllergy: Boolean;
     OtherAllergy: String;
     GeneralDetails: String;
     Observation: String;
     LastAccessTime: Date;
     LastAccessUserId: string;
     AnimalAllergy: Boolean;
     ChemicalAllergy: Boolean;
     SunAllergy: Boolean;
     MedicalEventId: number;
     Enabled: Boolean;

    
}

export class PatientMedicament {
    public PatientMedicamentId: number;
    public PatientId: number;
    public CreatedDate: Date;
    public CreatedUserId: string;
    public MedicamentName: String;
    public Periodicity_hours: number;
    public DaysCount: number;
    public MedicalEventId: number;
    public PatientMedicamentId_Parent: number;
    public MedicamentPresentation: String;
    public Enabled: Boolean;
    public Dosis: String;
    public Status: number;
}