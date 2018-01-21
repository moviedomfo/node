import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { ProfesionalService,CommonService } from '../../../service/index';
import { ProfesionalBE, Profesional_FullViewBE, ProfesionalesGridBE,IContextInformation, IParam, Param,HealtConstants, ServiceError } from '../../../model/index';
import {TipoParametroEnum} from '../../../model/common.constants'

//permmite cambiar la variable obsevada
import { Subject } from 'rxjs/Subject';
//permite observar
import { Observable } from 'rxjs/Observable';


// rich grid and rich grid declarative
import {DateComponent} from "../../../commonComponents/ag-grid/date.component";
import {HeaderComponent} from "../../../commonComponents/ag-grid/header.component";
import {HeaderGroupComponent} from "../../../commonComponents/ag-grid/header-group.component";
import {GridOptions} from "ag-grid/main";
import { Router, CanActivate ,CanDeactivate} from '@angular/router';

@Component({
  selector: 'app-profesional',
  templateUrl: './profesionalGrid.component.html'
  
})
export class ProfesionalGridComponent implements OnInit {
  profesionalBEList$: Observable<ProfesionalesGridBE[]>;
  profesionalList: ProfesionalesGridBE[];
  currentProfesional: ProfesionalesGridBE;
  private txtQuery: string;
  private profesionalCount: number;
  private columnDefs:any[];
  private gridOptions:GridOptions;
  globalError: ServiceError;
  constructor(
      private commonService: CommonService,
      private profesionalService: ProfesionalService,
      private router: Router) {
      this.profesionalList = [];
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
    { headerName: "Nombre", field: "Nombre" ,width: 150,pinned: true,filter: 'text'},
    { headerName: "Apellido", field: "Apellido" ,width: 150,pinned: true,filter: 'text'},
    { headerName: "Documento", field: "NroDocumento" ,width: 150,pinned: true,filter: 'text'},
    { headerName: "Matricula", field: "Matricula" ,width: 150,pinned: true,filter: 'text'},
    { headerName: "Especialidad", field: "NombreEspecialidad" ,width: 150,pinned: true,filter: 'text'},
    { headerName: "NombreProfecion", field: "NombreProfecion" ,width: 150,pinned: true,filter: 'text'},
    { headerName: "Fecha alta", field: "FechaAlta",width: 200,pinned: true }
  ];
}
  onKey_Enter(value: string) {
    //this.txtQuery += value + ' | ';
    this.retrivePatients();
  }

  retrivePatients() {
    

    this.profesionalBEList$ = this.profesionalService.retriveProfesionalesGrid$(this.txtQuery,this.txtQuery,HealtConstants.DefaultHealthInstitutionId);
    this.profesionalBEList$.subscribe(
      res => {
        this.profesionalList = res;
        if(this.profesionalList)
        {
        this.profesionalCount = this.profesionalList.length;
        }
        else
        {
          this.profesionalCount = 0;
        }

      },
      err => {
        
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
    
    console.log(event.node.data);
    let IdProfesional = event.node.data.IdProfesional;
    
    // http://localhost:4200/patientEdit?id=4350
    //this.router.navigate(['patientEdit'], { queryParams: { id: patienId }}); 
    
    this.router.navigate(['/profesionalEdit', IdProfesional]); 
    

  }
  onModelUpdated(event){

  }

}
