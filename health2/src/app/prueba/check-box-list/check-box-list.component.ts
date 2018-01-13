import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { Rol } from "../../model/index";

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
  constructor() { }

  ngOnInit() {
    var rol :Rol = new Rol();
    rol.RolName= 'amitis';
    this.allRoles.push(rol);
    rol  = new Rol();
    rol.RolName= 'medico';
    rol.isChecked= false;
    this.allRoles.push(rol);
    rol  = new Rol();
    rol.RolName= 'secretario';
    this.allRoles.push(rol);
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

}
