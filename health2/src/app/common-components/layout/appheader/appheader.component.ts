import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { pipe } from 'rxjs';
import { AuthenticationService, ProfesionalService } from '../../../service';
import { CurrentLogin, ProfesionalFullData, AppConstants } from '../../../model';
import * as moment from 'moment';
import { DomSanitizer, SafeUrl } from '@angular/platform-browser';
import { helperFunctions } from '../../../service/helperFunctions';
import { Router } from '@angular/router';


@Component({
  selector: 'app-appheader',
  templateUrl: './appheader.component.html',
  encapsulation: ViewEncapsulation.None
})
export class AppheaderComponent implements OnInit {
  public isLogged: boolean = false;
  public userName: string = '';
  public apellidoNombre: string = '';
  public nombreEspecialidad: string = '';
  public desde: string = '';
  public profesionalPhotoUrl: SafeUrl = '';

  constructor(
    private router: Router,
    private authService: AuthenticationService,
    private profService: ProfesionalService,
    private domSanitizer: DomSanitizer) {

    //subscriptions to loging changes
    this.authService.logingChange_subject$.subscribe(pipe(
      res => {
        //this.isLogged= res as boolean;
        this.chk_logingFront();
      }
    ));
    //subscriptions to profesional data chenges
    this.profService.currentProfesionalChange_subject$.subscribe(pipe(
      res => {
        let p: ProfesionalFullData = res as ProfesionalFullData;

        this.chk_profDataFront(p);
      }
    ));


  }

  ngOnInit() {
    this.chk_logingFront();
  }

  onBtnLogin_click(){
      
      this.router.navigate(['/login']);
    }
  
  chk_logingFront() {
    var currentLoging: CurrentLogin = this.authService.getCurrenLoging();
    if (currentLoging) {

      //console.log('user logged');
      //this.isLogged = true;
      this.userName = currentLoging.currentUser.UserName;
      let prof: ProfesionalFullData = this.authService.get_currentProfesionalData();
      this.chk_profDataFront(prof);
    } else {
      //console.log('NOT user logged');
      this.isLogged = false;
    }


  }


  chk_profDataFront(prof: ProfesionalFullData) {
    if (prof) {

      //console.log('user logged');
      this.isLogged = true;
      //this.apellidoNombre = prof.Profesional.Persona.ApellidoNombre();

      this.apellidoNombre = helperFunctions.getPersonFullName(prof.Profesional.Persona.Nombre, prof.Profesional.Persona.Apellido)
      this.nombreEspecialidad = prof.Profesional.NombreEspecialidad;
      var sinceDate = moment(prof.Profesional.FechaAlta).format('MMMM Do YYYY, h:mm:ss a');
      var since = moment(prof.Profesional.FechaAlta, "YYYYMMDD").fromNow();
      this.desde = sinceDate;

      if (prof.Profesional.Persona.Foto !== null) {

        //Convert the ArrayBuffer to a typed array 
        // const TYPED_ARRAY = new Uint8Array(prof.Profesional.Persona.Foto);
        // // converts the typed array to string of characters
        // const STRING_CHAR = String.fromCharCode.apply(null, TYPED_ARRAY);
        // let base64String = btoa(STRING_CHAR);
        // console.log("Base 64 de la foto:   " + prof.Profesional.Persona.Foto);
        this.profesionalPhotoUrl = this.domSanitizer.bypassSecurityTrustUrl('data:image/jpg;base64, ' + prof.Profesional.Persona.Foto);

      }
      else {
        this.loadDefaultPhoto(prof.Profesional.Persona.Sexo);
      }
      //si es hombre
      if (prof.Profesional.Persona.Sexo === 0) {

      }

    } else {
      //console.log('NOT user logged');
      this.isLogged = false;
    }
  }

  
  loadDefaultPhoto(sexo: number) {

    this.profesionalPhotoUrl = AppConstants.ImagesSrc_Woman;
    if (sexo === 0) {
      this.profesionalPhotoUrl = AppConstants.ImagesSrc_Man;
    }
  }
}
