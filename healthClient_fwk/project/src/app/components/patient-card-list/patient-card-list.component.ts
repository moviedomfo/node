import { Component, OnInit } from '@angular/core';
import { PatientsService } from 'src/app/service/patients.service';
//https://www.youtube.com/watch?v=CRJxOA5FZZE

@Component({
  selector: 'app-patient-card-list',
  templateUrl: './patient-card-list.component.html',
  styleUrls: ['./patient-card-list.component.css']
})
export class PatientCardListComponent implements OnInit {

  constructor(   private patientsService: PatientsService,) { }

  ngOnInit() {
  }

}
