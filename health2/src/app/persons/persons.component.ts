import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, ParamMap } from '@angular/router';
import { Observable } from 'rxjs/Observable';
import { PatientBE,PersonBE } from '../model/index';
import { PatientsService,CommonService } from '../service/index';

@Component({
  selector: 'app-persons',
  templateUrl: './persons.component.html',
  styleUrls: ['./persons.component.css']
})
export class PersonsComponent implements OnInit {

  private currentPerson:PersonBE;
  public personId :number;

  constructor( 
    private patientsService: PatientsService,   
    private route: ActivatedRoute) 
  { 

  }


  ngOnInit() {
    // console.log("-------------------------------------");
    // // console.log(JSON.stringify( this.route.url));
    // console.log(this.route);
     this.personId= this.route.snapshot.params['id'];
     
     this.patientsService.getPatientById(this.personId)
    .subscribe(
       res => {
         if(res===null)
         {
          // alert("No hay paciente");
         }
        this.currentPerson= res.Persona;
        //alert(this.currentPerson.Apellido);
       }
     );

    // alert(this.personId);
    // console.log("-------------------------------------");
    // this.persona$ = this.route.paramMap
    // .switchMap((params: ParamMap) => {
    //   // (+) before `params.get()` turns the string into a number
    //   this.selectedId = + params.get('id');
    //   ParientBE patienBe = this.patientsService.getPatientById(this.selectedId);
    //   persona.id=  patienBe.id;
    // });

    
  }

}
