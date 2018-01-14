import { Component, OnInit, ViewEncapsulation, Input, Output, EventEmitter, AfterViewInit, ViewChild } from '@angular/core';
import { ControlContainer, NgForm } from '@angular/forms';

import { User, ServiceError, Rol } from "../../model/common.model";
import { ProfesionalService }  from '../../service/index';
import { Observable } from "rxjs/Observable";

class UserSession
{
  UserName: string;
 email: string;
 password: string;
 confirmPassword: string;
}

@Component({
  selector: 'app-session-setting',
  templateUrl: './sessionSetting.component.html',
  encapsulation: ViewEncapsulation.None,
  viewProviders: [ { provide: ControlContainer, useExisting: NgForm } ]
})


export class SessionSettingComponent implements AfterViewInit {
  
   
  globalError: ServiceError;
  @Input()    public currentUser: User;
   
   @Output() OnComponentError = new EventEmitter<ServiceError>();
   allRoles :Rol[]=[];

  constructor(private profesionalService: ProfesionalService) { }

  ngOnChanges(){
    this.MachRolesGrid( );
  }

  ngAfterViewInit(){}

  ngOnInit() {
     
    
     if(!this.currentUser)//if user is not {} or nullr is {} or null
     {
      this.currentUser= new User();
      this.currentUser.Roles=[];
     }
     
    var allRoles$ :Observable<Rol[]>= this.profesionalService.getAllRoles$(this.currentUser.UserName);

     allRoles$.subscribe(
       res => {
         this.allRoles = res;
        
       },
       err => {
 
         this.OnComponentError.emit(err);
       }
     );
     
  }

  checkRol(rolName){
    
    var any= this.allRoles.find(r=>r.RolName==rolName);
    if(any){
    
      any.isChecked=true;
    }
    
  }
  MachRolesGrid()
  {  
   
    if (!this.currentUser || !this.currentUser.Roles ) {
      console.log('MachRolesGrid return');
      return;
    }
  
    this.allRoles.forEach((item) => {
      //busca dento de los role del uario 
     var any= this.currentUser.Roles.find(r=>r==item.RolName);
      if(any){
        item.isChecked = true;
        console.log(item.RolName + ' isChecked ='  ,  item.isChecked);
      }
      else{
        item.isChecked = false;
      }
      
    });
  }
  // }
  btnCheckUserName_Click(){
    //this.authenticationService.
    //bool exist = Fwk.UI.Controller.SecurityController.ValidateUserExist(txtUsername.Text.Trim());
    //El nombre de usuario ya se encuentra registrado \r\n por favor elija otro
    //Nombre de usuario disponible

    var userExist$=this.profesionalService.validateUserExist$( this.currentUser.UserName);

 

    userExist$.subscribe(
      res => {
        if(res===true)
        {
         alert('El nombre de usuario esta en uso !!');
        }
        else{
          alert('El nombre de usuario esta disponible');
        }
      },
      err => {

        this.OnComponentError.emit(err);
      }
    );
  }
  btnResetPwd_Click(){
    //mostrar "Esta a punto de reestablacer la clave de inicio de sesión del usuario, esta seguro ?"
    if(!this.currentUser.UserName || this.currentUser.UserName=='')
    {
      alert('falta nombre de usuario');
    }
    if(!this.currentUser.Password || this.currentUser.Password=='')
    {
      alert('falta nombre de Password');
      return;
    }
    var reset$=this.profesionalService.resetUserPassword$( this.currentUser.UserName,  this.currentUser.Password);
    reset$.subscribe(
      res => {
        if(res===true)
        {
         alert('La password se cambio con exito !!');
        }
       
      },
      err => {

        this.OnComponentError.emit(err);
      }
    );
  }
}

