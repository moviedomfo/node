import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { Rol } from "../../model/index";

@Component({
  selector: 'app-check-box-list',
  templateUrl: './check-box-list.component.html',

  encapsulation: ViewEncapsulation.None
})
export class CheckBoxListComponent implements OnInit {
  allRoles :Rol[]=[];
  
  constructor() { }

  ngOnInit() {
    let rol :Rol = new Rol();
    rol.RolName= 'amitis';
    this.allRoles.push(rol);
    rol  = new Rol();
    rol.RolName= 'medico';
    this.allRoles.push(rol);
    rol  = new Rol();
    rol.RolName= 'secretario';
    this.allRoles.push(rol);
  }

  btnGetCheckedList(){

  }
  onCmbRolChange($event){
    alert($event.target.value);
  }
}
