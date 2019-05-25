import { Component, OnInit, ViewChild, AfterViewInit, Input} from '@angular/core';
import { Location} from '@angular/common';
import { ServiceError, PatientBE, IPatient, IPerson } from 'src/app/model';
import { Observable } from 'rxjs';
import { CommonService } from 'src/app/service/common.service';
import { PatientsService } from 'src/app/service/patients.service';
import { MatTableDataSource,MatPaginator, MatSort } from '@angular/material';
import { NgxSpinnerService } from 'ngx-spinner';
import { NgForm } from '@angular/forms';



@Component({
  selector: 'app-patient-grid-table-modal',
  templateUrl: './patient-grid-table-modal.component.html',
  styleUrls: ['./patient-grid-table-modal.component.css']
})
export class PatientGridTableModalComponent implements OnInit {
@Input() currentPatient: IPerson;
  constructor(
    private commonService: CommonService,   
     private patientsService: PatientsService,
    private location: Location
  ) { }
  ngOnInit() {
  }

  onSavepatient(patientForm: NgForm): void {
    if (patientForm.value.patientId == null) {
      // NEW
      //this.patientsService.savePatient(patientForm.value).subscribe(patient => location.reload());
    } else {
      // update
      //this.patientsService.updatePatient(patientForm.value).subscribe(patient => location.reload());
    }
  }
}
