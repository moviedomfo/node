import { Component, OnInit } from '@angular/core';
import { PatientBE } from '../../model/index';
import { PatientsService,CommonService } from '../../service/index';


//permmite cambiar la variable obsevada
import { Subject } from 'rxjs/Subject';
//permite observar
import { Observable } from 'rxjs/Observable';

// rich grid and rich grid declarative
import {DateComponent} from "../../commonComponents/ag-grid/date.component";
import {HeaderComponent} from "../../commonComponents/ag-grid/header.component";
import {HeaderGroupComponent} from "../../commonComponents/ag-grid/header-group.component";
import {GridOptions} from "ag-grid/main";
@Component({
  selector: 'app-patient-grid',
  templateUrl: './patient-grid.component.html',
  styleUrls: ['../../commonComponents/ag-grid/rich-grid.css', '../../commonComponents/ag-grid/proficiency-renderer.css'],
})
export class PatientGridComponent implements OnInit {
  private txtQuery: string;
  private patientCount: number;
  private patientList$: Observable<PatientBE[]>;
  private patientList: PatientBE[];
  currentPatient: PatientBE;
  private columnDefs:any[];
  private gridOptions:GridOptions;

  constructor(private commonService: CommonService, private patientsService: PatientsService) {
    this.patientList = [];
  }

  ngOnInit() {
    // we pass an empty gridOptions in, so we can grab the api out
     this.gridOptions = <GridOptions>{};
     this.gridOptions.dateComponentFramework = DateComponent;
     this.gridOptions.defaultColDef = {
         headerComponentFramework : <{new():HeaderComponent}>HeaderComponent,
         headerComponentParams : {
             menuIcon: 'fa-bars'
         }
     }
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
    { headerName: "Fecha alta", field: "FechaAlta",width: 200,pinned: true }
  ];
}
  onKey_Enter(value: string) {
    //this.txtQuery += value + ' | ';
    this.retrivePatients();
  }


  retrivePatients() {


    this.patientList$ = this.patientsService.retrivePatients$(this.txtQuery);
    this.patientList$.subscribe(
      res => {
        this.patientList = res;
        
        this.patientCount = this.patientList.length;

      }
    );

  }

  onGridReady(params) {
    params.api.sizeColumnsToFit();
  }
  onGridCellDoubleClick(event){
    //alert(event);
  }
  onGridRowDoubleClick(event){
    
    alert(JSON.stringify(event));
  }
  onModelUpdated(event){

  }
}
