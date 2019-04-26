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
  private displayedColumns: string[]  =['position', 'name', 'weight', 'symbol'];
  globalError: ServiceError;
  private patientList$: Observable<PatientBE[]>;
  private patientList: PatientBE[];
 private dataSourse2 :IPerson[];
 private dataSourse :PeriodicElement[];
  private txtQuery: string;
 
  
  constructor(
    private commonService: CommonService,    private patientsService: PatientsService) {
      //this.displayedColumns :string[]= ['Id', 'Nombre', 'NroDocumento','FechaAlta'];
      this.dataSourse =[];
      this.dataSourse2 =[];
      this.displayedColumns= ['position', 'name', 'weight', 'symbol'];

      let ELEMENT_DATA : PeriodicElement[] = [
        {position: 1, name: 'Hydrogen', weight: 1.0079, symbol: 'H'},
        {position: 2, name: 'Helium', weight: 4.0026, symbol: 'He'},
        {position: 3, name: 'Lithium', weight: 6.941, symbol: 'Li'},
        {position: 4, name: 'Beryllium', weight: 9.0122, symbol: 'Be'},
        {position: 5, name: 'Boron', weight: 10.811, symbol: 'B'},
        {position: 6, name: 'Carbon', weight: 12.0107, symbol: 'C'},
        {position: 7, name: 'Nitrogen', weight: 14.0067, symbol: 'N'},
        {position: 8, name: 'Oxygen', weight: 15.9994, symbol: 'O'},
        {position: 9, name: 'Fluorine', weight: 18.9984, symbol: 'F'},
        {position: 10, name: 'Neon', weight: 20.1797, symbol: 'Ne'},
      ];
      
      this.dataSourse = ELEMENT_DATA;
    }

  ngOnInit() {
    
    this.patientList = [];
    this.retrivePatients();
  }


retrivePatients() {
    this.patientList$ = this.patientsService.retrivePatients$(this.txtQuery);
    this.patientList$.subscribe((res:PatientBE[]) =>
      {
        this.patientList= res;
        this.parceToIPerson();
        
      },
      err => {this.globalError = err;}
    );
    
  }

 parceToIPerson(){
  this.patientList.forEach(p=>{
          
    this.dataSourse2.push(
       {
          Id :p.PatientId,
          Nombre: p.Persona.Apellido + ',' + p.Persona.Nombre, 
          NroDocumento:p.Persona.NroDocumento,
          FechaAlta:p.FechaAlta}
       );
    });
 }

}
export interface IPerson {
  Id: number;
  NroDocumento: string;
  Nombre: string;
  FechaAlta: Date;
}
export interface PeriodicElement {
  name: string;
  position: number;
  weight: number;
  symbol: string;
}
const ELEMENT_DATA: PeriodicElement[] = [
  {position: 1, name: 'Hydrogen', weight: 1.0079, symbol: 'H'},
  {position: 2, name: 'Helium', weight: 4.0026, symbol: 'He'},
  {position: 3, name: 'Lithium', weight: 6.941, symbol: 'Li'},
  {position: 4, name: 'Beryllium', weight: 9.0122, symbol: 'Be'},
  {position: 5, name: 'Boron', weight: 10.811, symbol: 'B'},
  {position: 6, name: 'Carbon', weight: 12.0107, symbol: 'C'},
  {position: 7, name: 'Nitrogen', weight: 14.0067, symbol: 'N'},
  {position: 8, name: 'Oxygen', weight: 15.9994, symbol: 'O'},
  {position: 9, name: 'Fluorine', weight: 18.9984, symbol: 'F'},
  {position: 10, name: 'Neon', weight: 20.1797, symbol: 'Ne'},
];
