import { Component, OnInit } from '@angular/core';
import { ServiceError, PatientBE } from 'src/app/model';
import { Observable } from 'rxjs';
import { CommonService } from 'src/app/service/common.service';
import { PatientsService } from 'src/app/service/patients.service';


@Component({
  selector: 'app-patient-grid',
  templateUrl: './patient-grid.component.html',
  styleUrls: ['./patient-grid.component.css']
})
export class PatientGridComponent implements OnInit {
  private displayedColumns: string[] = [];
  globalError: ServiceError;
  private patientList$: Observable<PatientBE[]>;
  private patientList: PatientBE[];
 private dataSourse :IPerson[];
  private txtQuery: string;
  private patientCount:Number;
  
  constructor(
    private commonService: CommonService,
    private patientsService: PatientsService) {
      this.displayedColumns = ['Id', 'Nombre', 'NroDocumento','FechaAlta'];
      this.dataSourse =[];
      //this.patientList =[  {PatientId: 1, Persona.Nombre: 'Hydrogen', NroDocumento: 1.0079}];
    }

  ngOnInit() {
    this.displayedColumns = ['Id', 'Nombre', 'NroDocumento','FechaAlta'];
    this.patientList = [];
    this.retrivePatients();
  }


retrivePatients() {
    this.patientList$ = this.patientsService.retrivePatients$(this.txtQuery);
    this.patientList$.subscribe((res:PatientBE[]) =>
      {
        this.patientList= res;
        this.patientList.forEach(p=>{
          
      this.dataSourse.push(
               {
                  Id :p.PatientId,
                  Nombre: p.Persona.Apellido + ',' + p.Persona.Nombre, 
                  NroDocumento:p.Persona.NroDocumento,
                  FechaAlta:p.FechaAlta}
            );
        });
        
      },
      err => {this.globalError = err;}
    );
    
  }

}
export interface IPerson {
  Id: number;
  NroDocumento: string;
  Nombre: string;
  FechaAlta: Date;
}