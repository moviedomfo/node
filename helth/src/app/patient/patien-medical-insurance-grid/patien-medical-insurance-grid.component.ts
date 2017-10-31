import { Component, OnInit ,Input,Output,EventEmitter} from '@angular/core';
import { Subject } from 'rxjs/Subject';
import { Observable } from 'rxjs/Observable';
// rich grid and rich grid declarative
import { DateComponent } from "../../commonComponents/ag-grid/date.component";
import { HeaderComponent } from "../../commonComponents/ag-grid/header.component";
import { HeaderGroupComponent } from "../../commonComponents/ag-grid/header-group.component";
import { GridOptions } from "ag-grid/main";
import { RowNode } from 'ag-grid/dist/lib/entities/rowNode';

import { MutualBE,MutualPorPacienteBE } from '../../model/index';

@Component({
  selector: 'app-patien-medical-insurance-grid',
  templateUrl: './patien-medical-insurance-grid.component.html',
  styleUrls: ['./patien-medical-insurance-grid.component.css']
})
export class PatienMedicalInsuranceGridComponent implements OnInit {

  @Input() 
  medicalInsuranceByPatientList:MutualPorPacienteBE[];
  private columnDefs: any[];
  private gridOptions: GridOptions;
  @Output() onMedicalInsuranceByPatientChanged = new EventEmitter<MutualPorPacienteBE>();
  public currentMedicalInsuranceByPatient:MutualPorPacienteBE;

  constructor() { }

  ngOnInit() {
      // we pass an empty gridOptions in, so we can grab the api out
      this.gridOptions = <GridOptions>{};
      this.gridOptions.dateComponentFramework = DateComponent;
      this.gridOptions.defaultColDef = {
          headerComponentFramework: <{ new(): HeaderComponent }>HeaderComponent,
          headerComponentParams: {
              menuIcon: 'fa-bars'
          }
      }
      //this.gridOptions.getContextMenuItems = this.getContextMenuItems.bind(this);
      this.gridOptions.floatingFilter = true;

      this.createColumnDefs();
  }
  private createColumnDefs() {
    this.columnDefs = [
        { headerName: "Mutual", field: "NombreMutual", width: 150, pinned: true, filter: 'text' },
        { headerName: "Nro Afiliado", field: "NroAfiliadoMutual", width: 150, pinned: true, filter: 'text' },
        { headerName: "Activa", field: "IsActive", width: 100, pinned: true }
    ];
}
onMedicalInsuranceByPatient_cellClicked($event) {
  this.currentMedicalInsuranceByPatient = $event.node.data;
  
  //document.querySelector('#selectedRows').innerHTML = this.currentMedicalInsuranceByPatient.Nombre;
  this.onMedicalInsuranceByPatientChanged.emit(this.currentMedicalInsuranceByPatient);
  
}

}