import { Component, OnInit } from '@angular/core';
import { map, catchError } from 'rxjs/operators';
import { Socket } from 'ngx-socket-io';
import { FwkDocumentService } from 'src/app/service/fwkSvcAlerts.service';

@Component({
  selector: 'app-patient-alerts',
  templateUrl: './patient-alerts.component.html',
  styleUrls: ['./patient-alerts.component.css']
})
export class PatientAlertsComponent implements OnInit {
  //constructor(private fwkDocumentService: FwkDocumentService) { }
  constructor() { }
 




  ngOnInit() {

    // this.fwkDocumentService.newMessage.subscribe(p=>{
    //   alert(p.doc);
    // });
  }
  
}
