import { Component, OnInit, ViewEncapsulation, Input, Output, EventEmitter, AfterViewInit, ViewChild } from '@angular/core';
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


export class SessionSettingComponent implements AfterViewInit {
  
   
  globalError: ServiceError;
  @Input()    public currentUser: User;
   user: UserSession;
   @Output() OnComponentError = new EventEmitter<ServiceError>();
   allRoles :Rol[]=[];

  constructor(private profesionalService: ProfesionalService) { }

  ngAfterViewInit() {   
    //alert(' ngAfterViewInit ' +  JSON.stringify (this.currentUser));
    //this.MachRolesGrid( this.currentUser.Roles);
  }
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
        
       },
       err => {
 
         this.OnComponentError.emit(err);
       }
     );
     
  }
  MachRolesGrid()
  {  
    if (!this.currentUser.Roles ) return;
  
    this.allRoles.forEach((item) => {
      //busca dento de los role del uuario 
     var any= this.currentUser.Roles.find(r=>r==item.RolName);
      if(any){
        item.isChecked = true;
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

