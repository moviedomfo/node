import { Component, OnInit, ViewChild } from '@angular/core';
import { ServiceError, PatientBE, IPatient } from 'src/app/model';
import { Observable } from 'rxjs';
import { CommonService } from 'src/app/service/common.service';
import { PatientsService } from 'src/app/service/patients.service';
import { MatTableDataSource,MatPaginator, MatSort } from '@angular/material';



@Component({
  selector: 'app-patient-grid',
  templateUrl: './patient-grid.component.html',
  styleUrls: ['./patient-grid.component.css']
})
export class PatientGridComponent implements OnInit {
  displayedColumns :string[] = ['Id', 'Nombre','NroDocumento','FechaAlta'];
  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;
  private IPersonlist : IPerson[];
  private dataSource = new MatTableDataSource<IPerson>(this.IPersonlist);
  private globalError: ServiceError;
   private patientList: PatientBE[];
   private txtQuery: string;
 
  
  constructor(
    private commonService: CommonService,    private patientsService: PatientsService) {
      
     
    }

  ngOnInit() {

    
    this.IPersonlist=[];
    this.patientList = [];
    this.dataSource = new MatTableDataSource<IPerson>(this.IPersonlist);
    this.dataSource.paginator = this.paginator;
    this.paginator.pageSize = 20;
    this.retrivePatients();
  }


retrivePatients() {
    let  patientList$: Observable<PatientBE[]>;

    //patientList$ = this.patientsService.retrivePatients$(this.txtQuery,this.paginator.pageIndex,this.paginator.pageSize);
    patientList$ = this.patientsService.retrivePatients$(this.txtQuery,null,null);
    patientList$.subscribe((res:PatientBE[]) =>
      {
        this.patientList= res;
        this.parceToIPerson();
        
      },
      err => {this.globalError = err;}
    );
    
  }


  getPagedData(data: IPerson[]) {
    const startIndex = this.paginator.pageIndex * this.paginator.pageSize;
    return data.splice(startIndex, this.paginator.pageSize);
  }
  applyFilter(filterValue: string) {
    this.dataSource.filter = filterValue.trim().toLowerCase();
    
  }
 parceToIPerson(){

 
  this.patientList.forEach(p=>{
    this.IPersonlist.push(
       {
          Id :p.PatientId,
          Nombre: p.Persona.Apellido + ',' + p.Persona.Nombre, 
          NroDocumento:p.Persona.NroDocumento,
          FechaAlta:p.FechaAlta}
       );
    });
    //this.dataSource.paginator = this.paginator;
    //this.dataSource =new MatTableDataSource<IPerson>(this.IPersonlist); //this.IPersonlist;
    var data = this.getPagedData(this.IPersonlist);
    this.dataSource = new MatTableDataSource(data);

 }

}
export interface IPerson {
  Id: number;
  NroDocumento: string;
  Nombre: string;
  FechaAlta: Date;
}


