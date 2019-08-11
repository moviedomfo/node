import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { pipe } from 'rxjs';
import { Router } from '@angular/router';
import { AuthenticationService, ProfesionalService } from '../../../service';
import { CurrentLogin, ProfesionalFullData, AppConstants } from '../../../model';
import { DomSanitizer, SafeUrl } from '@angular/platform-browser';
@Component({
  selector: 'app-appmenu',
  templateUrl: './appmenu.component.html',
  styleUrls: ['./appmenu.component.css'],
  encapsulation: ViewEncapsulation.None
})
export class AppmenuComponent implements OnInit {
  public profesionalPhotoUrl: SafeUrl = '';
  constructor(
    private authService: AuthenticationService,
    private profService: ProfesionalService,
    private domSanitizer: DomSanitizer) { }

  ngOnInit() {
    this.authService.logingChange_subject$.subscribe(pipe(
      res => {
        //this.isLogged= res as boolean;
        this.chk_logingFront();
      }
    ));

  this.profService.currentProfesionalChange_subject$.subscribe(pipe(
      res => {
        let p: ProfesionalFullData= res as ProfesionalFullData;
       
        this.chk_profDataFront(p);
      }
    ));

  }
  chk_logingFront() {
    var currentLoging: CurrentLogin = this.authService.getCurrenLoging();
    if (currentLoging) {
      
      //console.log('user logged');
      //this.isLogged = true;
      
      let prof : ProfesionalFullData = this.authService.get_currentProfesionalData();
      this.chk_profDataFront(prof);
    } else {
      //console.log('NOT user logged');
      
    }


  }


  chk_profDataFront(prof: ProfesionalFullData) {
    if (prof) {


      if (prof.Profesional.Persona.Foto !== null) {


        this.profesionalPhotoUrl = this.domSanitizer.bypassSecurityTrustUrl('data:image/jpg;base64, ' + prof.Profesional.Persona.Foto);
        
      }
      else {
        this.loadDefaultPhoto(prof.Profesional.Persona.Sexo);
      }
      //si es hombre
      if(prof.Profesional.Persona.Sexo===0){
      
      }

    } else {
            
    }
  }
  loadDefaultPhoto(sexo:number) {

    let imgUrl=AppConstants.ImagesSrc_Woman;
    if(sexo===0){
      imgUrl = AppConstants.ImagesSrc_Man;
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
