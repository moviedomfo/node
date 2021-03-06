import { Component, OnInit } from '@angular/core';
import { PatientsService } from '../../service/index';
import { PatientBE,IContextInformation, IParam, Param } from '../../model/index';
import {TipoParametroEnum} from '../../model/common.constants'


//permmite cambiar la variable obsevada

//permite observar
import { Observable } from 'rxjs';



@Component({
  selector: 'app-patient',
  templateUrl: './patient.component.html'
  })
export class PatientComponent implements OnInit {

  patientList$: Observable<PatientBE[]>;
  patientList: PatientBE[];
  currentPatient: PatientBE;
  


  
  constructor(private patientService: PatientsService) {
    

  }

  onCreatePatient(res) {
    this.patientList = res;
  }
  ngOnInit() {
 
    this.patientList$ = this.patientService.retrivePatientsSimple$();
    this.patientList$.subscribe(
      res => {

        this.patientList = res;

      }
    );
    this.patientList$.subscribe(
      res => {
        this.patientList = res;
      

      },
      err => {
        alert(err.Message);
        //this.globalError = err;
      }
    );
   
  }



  reriveAllPatientList() {
    console.log("LLAMANDO A this.patientService.reriveAllPatientList$()");
    this.patientService.reriveAllPatientList$();

  }

 




}
