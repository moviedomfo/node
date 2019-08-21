import { Component, OnInit, EventEmitter, Input, Output, AfterViewInit, ViewChild } from '@angular/core';
import { PatientBE, PersonBE, MutualPorPacienteBE, MutualPlanGridView } from '../../model/index';
import { AggridTestComponent } from './aggrid-test/aggrid-test.component';


@Component({
  selector: 'app-test-grid-parent',
  templateUrl: './test-grid-parent.component.html',
  styleUrls: ['./test-grid-parent.component.css']
})

export class TestGridParentComponent implements AfterViewInit {

  nombre: string;
  id: number;

// rowData = [
//     { make: 'Toyota', model: 'Celica', price: 35000 },
//     { make: 'Ford', model: 'Mondeo', price: 32000 },
//     { make: 'Porsche', model: 'Boxter', price: 72000 }
// ];
  // patientList_Source = new Subject<MutualPorPacienteBE[]>();
  public rowData: PersonBE[];
  constructor() { 


    
  }

  @ViewChild('testGrid', { static: false }) grilla: AggridTestComponent;

  ngAfterViewInit() {
    // Ahora puedes utilizar el componente hijo
    this.grilla.Refresh();
  }
  ngOnInit() {
    this.fillData();
  }

  private fillData() {

    this.rowData = [];

    // tslint:disable-next-line:prefer-const
    // tslint:disable-next-line:typedef-whitespace
    // tslint:disable-next-line:typedef-whitespace
    let item: PersonBE = new PersonBE();
    item.Nombre = 'MuMondeo ';
    item.IdPersona = 123211;
    this.rowData.push(item);

  }

  private appendNewItem() {

    var item: PersonBE = new PersonBE();
    item.Nombre = this.nombre;
    item.IdPersona = this.id;
    this.rowData.push(item);

    this.grilla.Refresh();
  }

}
