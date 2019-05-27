import { Component, OnInit, ViewChild, AfterViewInit } from '@angular/core';
import { ServiceError, PatientBE, IPatient, IPerson } from 'src/app/model';
import { Observable } from 'rxjs';
import { CommonService } from 'src/app/service/common.service';
import { PatientsService } from 'src/app/service/patients.service';
import { MatTableDataSource,MatPaginator, MatSort } from '@angular/material';
import { NgxSpinnerService } from 'ngx-spinner';
import { NgForm } from '@angular/forms';



@Component({
  selector: 'app-patient-grid-table',
  templateUrl: './patient-grid-table.component.html',
  styleUrls: ['./patient-grid-table.component.css']
})
export class PatientGridTableComponent implements AfterViewInit {
  private personlist : IPerson[];
  private globalError: ServiceError;
   private patientList: PatientBE[];
   public selectedPerson:IPerson;
   private txtQuery: string;
   
   pageActual: number = 1;
   public myCounter: number = 0;

   constructor(
    private commonService: CommonService,   
     private patientsService: PatientsService,
     private spinner: NgxSpinnerService) {    }

     ngAfterViewInit(): void {
      this.retrivePatients();
    
    }
    ngOnInit():void {
      //this.showSpinner('spinner2');
      this.resetForm();
      this.personlist=[];
      this.patientList = [];

    
      
    }
  retrivePatients() {
    let  patientList$: Observable<PatientBE[]>;
    //this.spinner.show('spinner1');
   
    //patientList$ = this.patientsService.retrivePatients$(this.txtQuery,this.paginator.pageIndex,this.paginator.pageSize);
    patientList$ = this.patientsService.retrivePatients$(this.txtQuery,null,null);
    patientList$.subscribe((res:PatientBE[]) =>
      {
        this.patientList= res;
        this.parceToIPerson();
        //this.hideSpinner('spinner2');
      },
      err => {   
         //this.hideSpinner('spinner2');
        this.globalError = err;
      }
    );
    
  }

  parceToIPerson(){

 
    this.patientList.forEach(p=>{
      this.personlist.push(
         {
            Id :p.PatientId,
            Nombre: p.Persona.Apellido + ',' + p.Persona.Nombre, 
            NroDocumento:p.Persona.NroDocumento,
            FechaAlta:p.FechaAlta}
         );
      });
      
  
   }
   onPreUpdatPerson(item: IPerson): void {
    this.selectedPerson = Object.assign({}, item);
  }
   
 resetForm(bookForm?: NgForm): void {
  this.selectedPerson = {
    
     //PatientId: null,
     Id: null,
     Nombre:'',
     FechaAlta:new Date(),
     NroDocumento: '',
     //LastAccessUserId: '',
     //LastHealthInstId: '',
     //Persona: null,
     //Mutuales : null,
  };
}
preventSingleClick = false;
 timer: any;
 delay: Number;

 grid_singleClick(item) {

  this.selectedPerson=item;
  // this.preventSingleClick = false;
  alert("grid_singleClick");
  
}
grid_doubleClick (item) {
 
  this.preventSingleClick = true;
  alert('grid_doubleClick' )
  
  
}

}
