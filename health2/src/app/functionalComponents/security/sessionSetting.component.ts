import { Component, OnInit, ViewEncapsulation, Input, Output, EventEmitter } from '@angular/core';
import { ControlContainer, NgForm } from '@angular/forms';

import { User, ServiceError, Rol } from "../../model/common.model";
import { ProfesionalService }  from '../../service/index';
import { Observable } from "rxjs/Observable";

class UserSession
{
 username: string;
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


export class SessionSettingComponent implements OnInit {

   
  globalError: ServiceError;
  @Input()    public currentUser: User;
   user: UserSession;
   @Output() OnComponentError = new EventEmitter<ServiceError>();
   allRoles :Rol[]=[];

  constructor(private profesionalService: ProfesionalService) { }
  ngOnInit() {
     this.user = new UserSession();
    
     if(this.currentUser)//if user is {} or null
     {
     
     this.user.username= this.currentUser.Username;
     this.user.email= this.currentUser.Email;
     this.user.password= '';
     this.user.confirmPassword= '';
     }
     else
     {  
       
      this.user= new UserSession();
     }


     var allRoles$ :Observable<Rol[]>= this.profesionalService.getAllRoles$(this.user.username);

     allRoles$.subscribe(
       res => {
         this.allRoles = res;
         //this.MachRolesGrid( this.currentUser.Roles);
       },
       err => {
 
         this.OnComponentError.emit(err);
       }
     );
     
  }
  
  MachRolesGrid(roles:string[])
  {
    if (!roles ) return;

    this.allRoles.forEach((item) => {
      
     let any= roles.find(r=>r==item.RolName);
      if(any.length>0){
        // int i = lstBoxRoles.FindString(lstRol.RolName);
        // object odj = lstBoxRoles.GetItem(i);
        // lstBoxRoles.SetItemChecked(i, true);
      }
      
    });
  }
  btnCheckUserName_Click(){
    //this.authenticationService.
    //bool exist = Fwk.UI.Controller.SecurityController.ValidateUserExist(txtUsername.Text.Trim());
    //El nombre de usuario ya se encuentra registrado \r\n por favor elija otro
    //Nombre de usuario disponible

    var userExist$=this.profesionalService.validateUserExist$( this.user.username);

 

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
}

