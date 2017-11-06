import { Component, OnInit, AfterViewInit, Input, Output, EventEmitter } from '@angular/core';
import { Subject } from 'rxjs/Subject';
import { Observable } from 'rxjs/Observable';
import { PatientBE, PersonBE, MutualPorPacienteBE, MutualPlanGridView } from '../../model/index';
import { AggridTestComponent } from './aggrid-test/aggrid-test.component';
import { ViewChild, ElementRef, Renderer2, AfterContentInit } from '@angular/core';

@Component({
  selector: 'app-test-grid-parent',
  templateUrl: './test-grid-parent.component.html',
  styleUrls: ['./test-grid-parent.component.css']
})

export class TestGridParentComponent implements AfterViewInit {

  nombre: string;
  id: number;
  // patientList_Source = new Subject<MutualPorPacienteBE[]>();
  public patientList: MutualPorPacienteBE[];
  constructor() { }

  @ViewChild('grillaMutuales') grilla: AggridTestComponent; 

  ngAfterViewInit() {
    // Ahora puedes utilizar el componente hijo
    this.grilla.Refresh();
  }
  ngOnInit () {
    this.fillData();
  }

  private fillData() {

    this.patientList = [];

    // tslint:disable-next-line:prefer-const
    // tslint:disable-next-line:typedef-whitespace
    // tslint:disable-next-line:typedef-whitespace
    let item : MutualPorPacienteBE = new MutualPorPacienteBE();
    item.NombreMutual = 'Mutial 1';
    item.Id = 123211;
    this.patientList.push(item);

  }

  private appendNewItem() {

    var item: MutualPorPacienteBE = new MutualPorPacienteBE();
    item.NombreMutual = this.nombre;
    item.Id = this.id;
    this.patientList.push(item);

    this.grilla.Refresh();
  }

}
