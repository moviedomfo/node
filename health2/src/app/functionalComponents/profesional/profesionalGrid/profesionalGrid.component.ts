import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { ProfesionalService, CommonService } from '../../../service/index';
import { ProfesionalBE, Profesional_FullViewBE, ProfesionalesGridBE, IContextInformation, IParam, Param, AppConstants, ServiceError } from '../../../model/index';
import { TipoParametroEnum } from '../../../model/common.constants'

//permmite cambiar la variable obsevada

//permite observar
import { Observable } from 'rxjs';


// rich grid and rich grid declarative
import { DateComponent } from "../../../common-components/controls/ag-grid/date.component";
import { HeaderComponent } from "../../../common-components/controls/ag-grid/header.component";
import { HeaderGroupComponent } from "../../../common-components/controls/ag-grid/header-group.component";
import { Router, CanActivate, CanDeactivate } from '@angular/router';
import { GridOptions } from 'ag-grid-community';

@Component({
  selector: 'app-profesional',
  templateUrl: './profesionalGrid.component.html'

})
export class ProfesionalGridComponent implements OnInit {
  public profesionalBEList$: Observable<ProfesionalesGridBE[]>;
  public profesionalList: ProfesionalesGridBE[];
  public currentProfesional: ProfesionalesGridBE;
  public txtQuery: string;
  public profesionalCount: number;
  public columnDefs: any[];
  public loadingDataState = 'finalized';
  //private gridOptions: GridOptions;
  globalError: ServiceError;
  constructor(
    private commonService: CommonService,
    private profesionalService: ProfesionalService,
    private router: Router) {
    this.profesionalList = [];
    this.createColumnDefs();
  }

  ngOnInit() {
    this.commonService.Set_mainComponentTitle("Consulta de profesionales");
    // we pass an empty gridOptions in, so we can grab the api out
    // this.gridOptions = <GridOptions>{};
    // this.gridOptions.dateComponentFramework = DateComponent;
    // this.gridOptions.defaultColDef = {
    //   headerComponentFramework: <{ new(): HeaderComponent }>HeaderComponent,
    //   headerComponentParams: {
    //     menuIcon: 'fa-bars'
    //   }
    // }
    // this.gridOptions.getContextMenuItems = this.getContextMenuItems.bind(this);
    // this.gridOptions.floatingFilter = true;

    

    this.retriveProfesionals();

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
      
      { headerName: "Nombre", field: "ApellidoNombre", width: 250, pinned: true, filter: 'text' },
      { headerName: "Documento", field: "NroDocumento", width: 150, pinned: true, filter: 'text' },
      { headerName: "Matricula", field: "Matricula", width: 150, pinned: true, filter: 'text' },
      { headerName: "Especialidad", field: "NombreEspecialidad", width: 150, pinned: true, filter: 'text' },
      { headerName: "Profecion", field: "NombreProfecion", width: 150, pinned: true, filter: 'text' },
      { headerName: "Fecha alta", field: "FechaAlta", width: 200, pinned: true },
      { headerName: "mail", field: "mail", width: 200, pinned: true }
      
    ];
  }

  onKey_Enter(value: string) {
    //this.txtQuery += value + ' | ';
    this.retriveProfesionals();
  }

  retriveProfesionals() {

    this.loadingDataState ='waiting';
    this.profesionalBEList$ = this.profesionalService.retriveProfesionalesGrid$(this.txtQuery, this.txtQuery, AppConstants.DefaultHealthInstitutionId);
    this.profesionalBEList$.subscribe(
      res => {
        
        this.profesionalList = res;
        if (this.profesionalList) {
          this.profesionalCount = this.profesionalList.length;
        }
        else {
          this.profesionalCount = 0;
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
  onCellClicked(event) { 

    //alert('onCellClicked');
  }
  onGridCellDoubleClick(event) {
    //alert(event);
  }

  onGridRowDoubleClick(event) {

    console.log(event.node.data);
    let IdProfesional = event.node.data.IdProfesional;

    // http://localhost:4200/patientEdit?id=4350
    //this.router.navigate(['patientEdit'], { queryParams: { id: patienId }}); 

    this.router.navigate(['/profesionalEdit', IdProfesional]);


  }
  onModelUpdated(event) {

  }

}
