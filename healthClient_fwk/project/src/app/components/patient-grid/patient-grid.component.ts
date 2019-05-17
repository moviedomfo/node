import { Component, OnInit, ViewChild, AfterViewInit } from '@angular/core';
import { ServiceError, PatientBE, IPatient } from 'src/app/model';
import { Observable } from 'rxjs';
import { CommonService } from 'src/app/service/common.service';
import { PatientsService } from 'src/app/service/patients.service';
import { MatTableDataSource,MatPaginator, MatSort } from '@angular/material';
import { NgxSpinnerService } from 'ngx-spinner';

@Component({
  selector: 'app-patient-grid',
  templateUrl: './patient-grid.component.html',
  styleUrls: ['./patient-grid.component.css']
})
export class PatientGridComponent implements AfterViewInit {
  
  displayedColumns :string[] = ['Id', 'Nombre','NroDocumento','FechaAlta'];
  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;
  private IPersonlist : IPerson[];
  private dataSource = new MatTableDataSource<IPerson>(this.IPersonlist);
  private globalError: ServiceError;
   private patientList: PatientBE[];
   private txtQuery: string;
 
  
  constructor(
    private commonService: CommonService,   
     private patientsService: PatientsService,
    private spinner: NgxSpinnerService) {    }



    ngAfterViewInit(): void {

      this.retrivePatients();
    }
  ngOnInit():void {

 
    this.IPersonlist=[];
    this.patientList = [];
    this.dataSource = new MatTableDataSource<IPerson>(this.IPersonlist);
    this.dataSource.paginator = this.paginator;
    this.paginator.pageSize = 20;
  
    
  }


retrivePatients() {
    let  patientList$: Observable<PatientBE[]>;
    //this.spinner.show('spinner1');
    this.showSpinner('spinner2');
    //patientList$ = this.patientsService.retrivePatients$(this.txtQuery,this.paginator.pageIndex,this.paginator.pageSize);
    patientList$ = this.patientsService.retrivePatients$(this.txtQuery,null,null);
    patientList$.subscribe((res:PatientBE[]) =>
      {
        this.patientList= res;
        this.parceToIPerson();
        this.hideSpinner('spinner2');
      },
      err => {   
         this.hideSpinner('spinner2');
        this.globalError = err;
      }
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

 showSpinner(name: string) {
  //this.spinner.show(name);
  this.spinner.show(name,
    {
      type: 'ball-clip-rotate-multiple',//'square-spin',
      size: 'medium',
      bdColor: 'rgba(100,149,237, .8)',
      color: 'white',
      fullScreen: false
    }
  );
}

hideSpinner(name: string) {
  this.spinner.hide(name);
}



}
export interface IPerson {
  Id: number;
  NroDocumento: string;
  Nombre: string;
  FechaAlta: Date;
}


