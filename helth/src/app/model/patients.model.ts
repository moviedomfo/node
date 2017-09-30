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
    public PatientId: number;
    public IdPersona: number;
    public FechaAlta: Date;
    public LastAccessTime: Date;
    public LastAccessUserId: string;
    public LastHealthInstId: string;
    public Persona:PersonBE;
 
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