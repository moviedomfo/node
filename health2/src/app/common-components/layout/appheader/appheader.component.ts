import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { pipe } from 'rxjs';
import { Router } from '@angular/router';
import { AuthenticationService, ProfesionalService } from '../../../service';
import { CurrentLogin, ProfesionalFullData, AppConstants, ProfesionalBE } from '../../../model';
import * as moment from 'moment';
import { AppComponent } from '../../../app.component';
import { DomSanitizer, SafeUrl } from '@angular/platform-browser';
import { helperFunctions } from '../../../service/helperFunctions';
@Component({
  selector: 'app-appheader',
  templateUrl: './appheader.component.html',
  styleUrls: ['./appheader.component.css'],
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


    this.authService.logingChange_subject$.subscribe(pipe(
      res => {
        //this.isLogged= res as boolean;
        this.chk_logingFront();
      }
    ));

    {this.profService.currentProfesionalChange_subject$.subscribe(pipe(
      res => {
        let p: ProfesionalFullData= res as ProfesionalFullData;
       
        this.chk_profDataFront(p);
      }
    ));}

    
  }

  ngOnInit() {
    this.chk_logingFront();}


  chk_logingFront() {
    var currentLoging: CurrentLogin = this.authService.getCurrenLoging();
    if (currentLoging) {
      
      //console.log('user logged');
      //this.isLogged = true;
      this.userName = currentLoging.currentUser.UserName;
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
      
      this.apellidoNombre = helperFunctions.getPersonFullName(prof.Profesional.Persona.Nombre,prof.Profesional.Persona.Apellido )
      this.nombreEspecialidad = prof.Profesional.NombreEspecialidad;
      var sinceDate = moment(prof.Profesional.FechaAlta).format('MMMM Do YYYY, h:mm:ss a');
      var since = moment(prof.Profesional.FechaAlta, "YYYYMMDD").fromNow();
      this.desde = sinceDate;
      if (prof.Profesional.Persona.Foto !== null) {
        //Convert the ArrayBuffer to a typed array 
        const TYPED_ARRAY = new Uint8Array(prof.Profesional.Persona.Foto);
        // converts the typed array to string of characters
        const STRING_CHAR = String.fromCharCode.apply(null, TYPED_ARRAY);
        let base64String = btoa(STRING_CHAR);
        this.profesionalPhotoUrl = this.domSanitizer.bypassSecurityTrustUrl('data:image/jpg;base64, ' + base64String);


      }
      else {


        this.loadDefaultPhoto(prof.Profesional.Persona.Sexo);
      }
      //si es hombre
      if(prof.Profesional.Persona.Sexo===0){
      
      }

    } else {
      //console.log('NOT user logged');
      this.isLogged = false;
    }
  }


  loadDefaultPhoto(sexo:number) {

    let imgUrl=AppConstants.ImagesSrc_Woman;
    if(sexo===0){
      imgUrl=AppConstants.ImagesSrc_Man;
    }
    this.profesionalPhotoUrl = imgUrl;

    return;
    let xhr = new XMLHttpRequest();
    xhr.open("GET", imgUrl, true);
    let self = this;
    //Obtain the result as an ArrayBuffer.
    xhr.responseType = "arraybuffer";
    xhr.onload = function (s) {

      // Converts arraybuffer to typed array object
      const TYPED_ARRAY = new Uint8Array(this.response);

      // converts the typed array to string of characters
      const STRING_CHAR = String.fromCharCode.apply(null, TYPED_ARRAY);

      //converts string of characters to base64String
      let base64String = btoa(STRING_CHAR);

      //sanitize the url that is passed as a value to image src attrtibute
      self.profesionalPhotoUrl = self.domSanitizer.bypassSecurityTrustUrl('data:image/jpg;base64, ' + base64String);
    }
    
  }
}
