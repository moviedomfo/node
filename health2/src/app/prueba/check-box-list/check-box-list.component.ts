import { Component, OnInit, ViewEncapsulation, Input, Output, EventEmitter, AfterViewInit, ViewChild } from '@angular/core';
import { User, ServiceError, Rol } from "../../model/common.model";
import { ProfesionalService }  from '../../service/index';
import { Observable } from "rxjs/Observable";
declare var jQuery:any;
declare var $:any;


@Component({
  selector: 'app-check-box-list',
  templateUrl: './check-box-list.component.html',

  encapsulation: ViewEncapsulation.None
})
export class CheckBoxListComponent implements OnInit {
  allRoles :Rol[]=[];
  currentRol:Rol;
  constructor(private profesionalService: ProfesionalService) { }

  ngOnInit() {
    // var rol :Rol = new Rol();
    // rol.RolName= 'amitis';
    // this.allRoles.push(rol);
    // rol  = new Rol();
    // rol.RolName= 'medico';
    // rol.isChecked= false;
    // this.allRoles.push(rol);
    // rol  = new Rol();
    // rol.RolName= 'secretario';
    // this.allRoles.push(rol);

    // rol  = new Rol();
    // rol.RolName= 'ingeniero';
    // rol.isChecked= false;
    // this.allRoles.push(rol);

    // rol  = new Rol();
    // rol.RolName= 'admin';
    // rol.isChecked= false;
    // this.allRoles.push(rol);

    var allRoles$ :Observable<Rol[]>= this.profesionalService.getAllRoles$('');

    allRoles$.subscribe(
      res => {
        this.allRoles = res;
       
      },
      err => {

        alert (JSON.stringify( err));
      }
    );
  }

  btnGetCheckedList(){

  }


  onCmbRolChange($event){
    
    //$event.target.value retorna nombre
    
    alert(JSON.stringify(this.currentRol));
    if($event.target.checked)
    {

      //alert($event.target.value);
      //role.isChecked = true : role.isChecked = false
    }
  }
  toggleTittle(){
    $('.titulo').slideToggle();
    jQuery('.titulo').slideToggle();
  }

  checkRol(){
    let rolName = $('#txtrolName').val();
    //alert(rolName);
    var any= this.allRoles.find(r=>r.RolName==rolName);
    if(any){
      console.log(JSON.stringify(any));
      any.isChecked=true;
    }
    
  }
}
