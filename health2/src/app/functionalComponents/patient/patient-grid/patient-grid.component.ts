import { Component, OnInit } from '@angular/core';
import { PatientBE, ServiceError } from '../../../model/index';
import { PatientsService,CommonService } from '../../../service/index';
//permmite cambiar la variable obsevada

//permite observar
import { Observable } from 'rxjs';

// rich grid and rich grid declarative
import {DateComponent} from "../../../common-components/controls/ag-grid/date.component";
import {HeaderComponent} from "../../../common-components/controls/ag-grid/header.component";
import {HeaderGroupComponent} from "../../../common-components/controls/ag-grid/header-group.component";

import { Router, CanActivate ,CanDeactivate} from '@angular/router';
import { GridOptions } from 'ag-grid-community';

@Component({
  selector: 'app-patient-grid',
  templateUrl: './patient-grid.component.html'
})
export class PatientGridComponent implements OnInit {
  globalError: ServiceError;
  private txtQuery: string;
  private patientCount: number;
  private patientList$: Observable<PatientBE[]>;
  private patientList: PatientBE[];
  public currentPatient: PatientBE;
  private columnDefs:any[];
  private gridOptions:GridOptions;
  public loadingDataState = 'finalized';
  constructor(
    private commonService: CommonService,
    private patientsService: PatientsService,
    private router: Router) {
    this.patientList = [];
  }

  ngOnInit() {
    this.commonService.Set_mainComponentTitle("Consulta de pacientes");
    // we pass an empty gridOptions in, so we can grab the api out
     this.gridOptions = <GridOptions>{};
     this.gridOptions.dateComponentFramework = DateComponent;
    //  this.gridOptions.defaultColDef = {
    //      headerComponentFramework : <{new():HeaderComponent}>HeaderComponent,
    //      headerComponentParams : {
    //          menuIcon: 'fa-bars'
    //      }
     //}
     this.gridOptions.getContextMenuItems = this.getContextMenuItems.bind(this);
     this.gridOptions.floatingFilter = true;

     this.createColumnDefs();

     
  
  }
  private getContextMenuItems(): any {
    let result: any = [
        { // custom item
            name: 'Alert ',
            action: function () {
                window.alert('Alerting about ');
            },
            cssClasses: ['redFont', 'bold']
        }];
    return result;
}
private createColumnDefs() {
  this.columnDefs = [
    { headerName: "Nombre", field: "Persona.Nombre" ,width: 150,pinned: true,filter: 'text'},
    { headerName: "Apellido", field: "Persona.Apellido" ,width: 150,pinned: true,filter: 'text'},
    { headerName: "Documento", field: "Persona.NroDocumento" ,width: 150,pinned: true,filter: 'text'},
    { headerName: "Fecha alta", field: "FechaAlta",width: 200,pinned: true }
  ];
}
  onKey_Enter(value: string) {
    //this.txtQuery += value + ' | ';
    this.retrivePatients();
  }


  retrivePatients() {

    this.loadingDataState ='waiting';
    this.patientList$ = this.patientsService.retrivePatients$(this.txtQuery);
    this.patientList$.subscribe(
      res => {
        this.patientList = res;
        if(this.patientList)
        {
        this.patientCount = this.patientList.length;
        }
        else
        {
          this.patientCount = 0;
        }
       this.loadingDataState ='finalized';
      },
      err => {
        this.loadingDataState ='finalized';
        this.globalError = err;
      }
    );

  }

  onGridReady(params) {
    params.api.sizeColumnsToFit();
  }

  onCellClicked(event){}

  onGridCellDoubleClick(event){
    //alert(event);
  }
  
  onGridRowDoubleClick(event){
    
    
    let patienId = event.node.data.PatientId;
    
    // http://localhost:4200/patientEdit?id=4350
    //this.router.navigate(['patientEdit'], { queryParams: { id: patienId }}); 
    
    this.router.navigate(['/patientEdit', patienId]); 
    

  }
  onModelUpdated(event){

  }
}
