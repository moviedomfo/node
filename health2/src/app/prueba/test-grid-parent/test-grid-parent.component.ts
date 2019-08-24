import { Component, OnInit, EventEmitter, Input, Output, AfterViewInit, ViewChild } from '@angular/core';
import { PatientBE, PersonBE, MutualPorPacienteBE, MutualPlanGridView } from '../../model/index';
import { AggridTestComponent } from './aggrid-test/aggrid-test.component';


@Component({
  selector: 'app-test-grid-parent',
  templateUrl: './test-grid-parent.component.html'

})

export class TestGridParentComponent implements AfterViewInit {

  nombre: string = "Mahatma Gandi";
  id: number = 23423432;


  // patientList_Source = new Subject<MutualPorPacienteBE[]>();
  //public rowData: PersonBE[];
  constructor() { 
//    this.rowData = [];

    
  }

  @ViewChild('testGrid', { static: false }) grilla: AggridTestComponent;

  ngAfterViewInit() {
    // Ahora puedes utilizar el componente hijo
    this.grilla.Refresh();
  }
  ngOnInit() {
    //this.fillData();
  }

  private fillData() {

    //this.rowData = [];

    // tslint:disable-next-line:prefer-const
    // tslint:disable-next-line:typedef-whitespace
    // tslint:disable-next-line:typedef-whitespace
    let item: PersonBE = new PersonBE();
    item.Nombre = 'Mondeo ';
    item.IdPersona = 123211;
    
    

  }

  private appendNewItem() {

    var item: PersonBE = new PersonBE();
    item.Nombre = this.nombre;
    item.IdPersona = this.id;
    
    this.grilla.appendNewItem(this.nombre,this.id);
    this.grilla.Refresh();
  }

}
