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
export class PlanVacunacion_FullViewBE {
    constructor(){}
    public Codigo: number;
    
    public FechaPlaneada: Date;
    public FechaColocacion: Date;
    public CodigoVacunaSustituta?: number;
    public Lote: string;
    
    public FechaPlaneada_Alterada: boolean;

    public Cantidad: number;
    public Nombre: number;
    public OrdenGrupo: number;
    public Grupo: number;
    public Comentario: number;
    
    public Anulaciones: number;
    public PatientId: number;
    public ProfesionalColocadorUserID: number;
    
    public NombreProfesionalQueColoco : string;


}

export class PlanVacunacionBE{
    public PatientId: number;
    public Codigo: number;
    public FechaPlaneada: Date;
    public FechaColocacion: Date;
    public ProfesionalColocadorUserID: number;
    public NombreProfesionalQueColoco : string;
    public Lote: string;
    public FechaPlaneada_Alterada: boolean;
    public CodigoVacunaSustituta?: number;
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
     FoodAllergy: boolean ;
     MedicamentsAllergy: boolean;
     MiteAllergy: boolean ;
     InsectAllergy: boolean ;
     PollenAllergy: boolean ;
     OtherAllergy: string;
     GeneralDetails: string;
     Observation: string;
     LastAccessTime: Date;
     LastAccessUserId: string;
     AnimalAllergy: boolean ;
     ChemicalAllergy: boolean ;
     SunAllergy: boolean ;
     MedicalEventId: number;
     Enabled: boolean ;

    
}

export class PatientMedicament {
    public PatientMedicamentId: number;
    public PatientId: number;
    public CreatedDate: Date;
    public CreatedUserId: string;
    public MedicamentName: string;
    public Periodicity_hours: number;
    public DaysCount: number;
    public MedicalEventId: number;
    public PatientMedicamentId_Parent: number;
    public MedicamentPresentation: string;
    public Enabled: boolean ;
    public Dosis: string;
    public Status: number;
}