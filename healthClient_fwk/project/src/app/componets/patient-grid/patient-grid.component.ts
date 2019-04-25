import { Component, OnInit } from '@angular/core';
import { ServiceError, PatientBE } from 'src/app/model';
import { Observable } from 'rxjs';
import { CommonService } from 'src/app/service/common.service';
import { PatientsService } from 'src/app/service/patients.service';

@Component({
  selector: 'app-patient-grid',
  templateUrl: './patient-grid.component.html',
  styleUrls: ['./patient-grid.component.css']
})
export class PatientGridComponent implements OnInit {
  globalError: ServiceError;
  private patientList$: Observable<PatientBE[]>;
  private patientList: PatientBE[];
  private txtQuery: string;
  private patientCount:Number;
  
  constructor(
    private commonService: CommonService,
    private patientsService: PatientsService) { }

  ngOnInit() {
    this.patientList = [];
    this.retrivePatients();
  }


retrivePatients() {


    this.patientList$ = this.patientsService.retrivePatients$(this.txtQuery);
    this.patientList$.subscribe(
      res => {
        this.patientList = res;
        if(this.patientList)
        {
        this.patientCount = this.patientList.length;
        }
        else
        {
          this.patientCount = 0;
        }

      },
      err => {
        
        this.globalError = err;
      }
    );

  }
 
}