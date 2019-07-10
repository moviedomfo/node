import { Component, OnInit } from '@angular/core';
import { ViewChild, AfterViewInit} from '@angular/core';

import { Observable } from 'rxjs';
import {PersonBE } from '../../model';

import { TestObservablesChildComponent } from './test-observables-child/test-observables-child.component';
@Component({
  selector: 'app-test-observables',
  templateUrl: './test-observables.component.html'
  
})
export class TestObservablesComponent implements OnInit {

 
  @ViewChild('child',{ static: false }) child: TestObservablesChildComponent; 
   private patientList : PersonBE[];

   private patientList$:Observable<PersonBE[]>;
  constructor() { }


  ngAfterViewInit(){
    
     this.patientList$= this.child.get_medicalInsuranceList$();
     this.patientList$.subscribe(p=>{
       console.log('Se inserto persona');

       //Esta asignacion no es necesaria.. ya q en el html se puede usar directamente 
       //patientList$ asynk
       this.patientList=p;
     });

  //   this.child.get_medicalInsuranceList$().subscribe(p=>{
  //     this.patientList=p;
  //  });


  }
  
  ngOnInit() {
   
  }

  get_medicalInsuranceList$_Event(p){
   // alert (JSON.stringify(p) );
  }


}
