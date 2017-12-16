import { Component, OnInit } from '@angular/core';
import { PatientsService,CommonService } from '../service/index';
import { PersonBE,PatientBE,IContextInformation, IParam, Param } from '../model/index';
import {TipoParametroEnum,DayNamesIndex_Value_ES} from '../model/common.constants'


//permmite cambiar la variable obsevada
import { Subject } from 'rxjs/Subject';
//permite observar
import { Observable } from 'rxjs/Observable';
/*import {Dropdown} from './dropdown.directive';
import {DropdownMenu} from './dropdown-menu.directive';
import {DropdownToggle} from './dropdown-toggle.directive';*/
//  import { ModalDialogComponent } from '../modal-dialog/modal-dialog.component';
//  import { DialogService } from "ng2-bootstrap-modal";


interface Friend {
    id: number;
    name: string;
}
@Component({
  selector: 'testcontroles-prueba',
  templateUrl: './testcontroles.component.html' 
})


export class TestControlesComponent implements OnInit {

    patientList$: Observable<PatientBE[]>;
    patientList: PatientBE[];
    currentPatient: PatientBE;
    private selectedPais: String = '';
    public paises: Array<String> = ["Afghanistan",
      "Albania", "Algeria", "Andorra", "Angola", "Antigua and Barbuda", "Argentina", "Armenia", "Australia", "Austria", "Azerbaijan", "Bahamas", "Bahrain",
      "Bangladesh", "Cote d'Ivoire", "Croatia", "Cuba"];
  
      private fechaAlta : string;
  
    //constructor(private dialogService:DialogService) { }
    constructor(private commonService : CommonService,private patientService: PatientsService) {
      //let paises: Array<number> = [1, 2, 3];
  
    }

  

    onCreatePatient(res) {
      this.patientList = res;
    }
    ngOnInit() {
      this.currentPatient = new PatientBE();
      this.currentPatient.Persona = new  PersonBE(999,"Marcelo");
      this.currentPatient.Persona.Nombre= "Marcelo";
      this.currentPatient.Persona.Apellido= "Oviedo";
      this.currentPatient.FechaAlta = new Date(Date.now());
      this.fechaAlta =this.currentPatient.FechaAlta.toISOString();
      //this.patientList$ = this.patientService.retrivePatientsSimple$();
      // this.patientList$.subscribe(
      //   res => {
  
      //     this.patientList = res;
  
      //   }
      // );
  
      // this.patientService.retrivePatientsSimple$().subscribe(
      //   res=>{
      //     alert('dasdasd');
      //       this.patientList = res;
      //       alert(JSON.stringify(this.patientList));
      //   }
      // ); 
  
      //this.patientList$.subscribe(res => this.onCreatePatient(res));
    }
  
   
    reriveAllPatientList() {
      console.log("LLAMANDO A this.patientService.reriveAllPatientList$()");
      this.patientService.reriveAllPatientList$();
  
    }
  
    onPaisSelection2(pais) {
  
      this.selectedPais = pais;
    }
  
    onPaisSelection(event) {
  
      alert(this.selectedPais);
  
  
    }
  
    seMovio(event) {
      // console.log('llamando retrivePatients');
  
      // this.patientService.retrivePatients$()
      //   .subscribe(res => alert("Se encontraron " + res.length + " pacientes"));
  
  
    }
    weekdays_to_bin:string;
    weekdays_to_bin_Array:string[]
     stackk:Boolean[];

     selectedDaysList:string[];
    convertToBase2(value:number)
    {
     
      this.weekdays_to_bin = Number(value).toString(2);

      this.weekdays_to_bin_Array=this.weekdays_to_bin.split('');
    
      this.stackk = this.CreateBoolArray(value);
      this.selectedDaysList = this.getDaysNames();
    }


    private CreateBoolArray(weekdays: number): Boolean[] {
      let stack = [];
      let stackInvertida:Boolean[] = [];
      this.weekdays_to_bin = Number(weekdays).toString(2);

      this.weekdays_to_bin_Array = this.weekdays_to_bin.split('');

      let val: Boolean;
      
      //Recorro el vector desde atras y los voy metiendo en la pila
      for (let i: number = this.weekdays_to_bin_Array.length-1 ; i >= 0; i--) {
        
       // console.log('this.weekdays_to_bin_Array[' + i +'] ' +this.weekdays_to_bin_Array[i] );
        val = this.weekdays_to_bin_Array[i] === '1' ? true : false;
        stack.push(val);
      }
     
      
      //Completo la pila con con falses hasta llegar a 7 posiciones (i < 7 - weekdays_to_bin_Array.Length)
      //Es desir: Si weekdays_to_bin_Array tiene =  11 dado q weekdays fue 3 completo la pila con 11+00000,
      
      for (let i: number = 0; i < 7 - this.weekdays_to_bin_Array.length; i++) {
        stack.push(false);
      }
      //console.log('Complete = ' + stack);
     //invierto stack asi me queda : 0000011 o false,false,false,false,false,true,true
      for (let i: number = stack.length-1; i >=0; i--) {
        //console.log('stack[' + i +'] ' +stack[i] );
          stackInvertida.push(stack[i]);
        }
      //console.log('stackInvertida = ' + stackInvertida);
      return stackInvertida;

    }




    private getDaysNames():string[] {
      var days: string[]=[];
      for (let i: number = 0; i <= this.stackk.length-1; i++) {

        var dayName: string;

       // alert('push  ' + this.stackk[i]  + ' to ' + days);
        //console.log('push  ' + this.stackk[i]  + ' to ' + days);
        
         if (this.stackk[i]) {
           dayName = DayNamesIndex_Value_ES.find(d => d.index === i).name;
           days.push(dayName);
          
         }
      }
      return days;
    }
  }