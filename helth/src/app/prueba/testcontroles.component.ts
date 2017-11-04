import { Component, OnInit } from '@angular/core';
import { PatientsService } from '../service/index';
import { PersonBE,PatientBE,IContextInformation, IParam, Param } from '../model/index';
import {TipoParametroEnum} from '../model/common.constants'


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
  
  
    //constructor(private dialogService:DialogService) { }
    constructor(private patientService: PatientsService) {
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
  
    createPatient(event) {
      //var result = this.patientService.myData();
      //var str: String = 'Pais seleccionado ' + this.selectedPais + ' ' + result;
      //alert(str);
      //var paicesFiltrados = this.paises.filter(p => p.startsWith('Ar'));
  
  
      // paicesFiltrados.forEach(element => {
      //   alert(element);
      // });
      //alert(str);
      //this.patientService.createPatientsService$(this.currentPatient);
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
  
  
  }
  