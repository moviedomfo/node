import { Component, OnInit } from '@angular/core';

import { BehaviorSubject, Observable ,Subject} from 'rxjs';
import { PersonBE } from '../../../model';
 
@Component({
  selector: 'app-test-observables-child',
  templateUrl: './test-observables-child.component.html'
})
export class TestObservablesChildComponent implements OnInit {
  nombre: string;
  id: number;
  /**Emite evento next para avisar cambio en variable */
  private medicalInsuranceListSubject : Subject <PersonBE[] >= new Subject <PersonBE[] > ();

  public medicalInsuranceList: PersonBE[];
  constructor() { }

  ngOnInit() {
    this.medicalInsuranceList=[];
  }

  //Inserta nueva persona y emite el evento al los subscriptores
  private appendNewItem(){

    let item : PersonBE = new PersonBE(this.id,this.nombre);
    this.medicalInsuranceList.push(item);
    this.medicalInsuranceListSubject.next(this.medicalInsuranceList);
  }

  //Notifica evento de cambios en el almacen []
  //a este metodo deben subscribirce los subscribers
  // Generalmente se hace esto en el OnInit :
  // servicio.get_medicalInsuranceList$().subscribe(p=>{//action});
 public get_medicalInsuranceList$() :Observable<PersonBE[]>{

  return this.medicalInsuranceListSubject.asObservable();

}


}
