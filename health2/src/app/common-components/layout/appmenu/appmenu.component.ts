import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { pipe } from 'rxjs';
import { AuthenticationService, ProfesionalService } from '../../../service';
import { CurrentLogin, ProfesionalFullData, AppConstants } from '../../../model';
import { DomSanitizer, SafeUrl } from '@angular/platform-browser';
import { helperFunctions } from '../../../service/helperFunctions';

@Component({
  selector: 'app-appmenu',
  templateUrl: './appmenu.component.html',
  styleUrls: ['./appmenu.component.css'],
  encapsulation: ViewEncapsulation.None
})
export class AppmenuComponent implements OnInit {
  public messagesCount:number=11;
  public profesionalPhotoUrl: SafeUrl = '';
  public isLogged: boolean = false;
  public apellidoNombre: string = '';
  constructor(
    private authService: AuthenticationService,
    private profService: ProfesionalService,
    private domSanitizer: DomSanitizer) { 



    }

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
  
    this.chk_logingFront();
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
        this.isLogged = false;
        alert('NOT user logged')
    }


  }


  chk_profDataFront(prof: ProfesionalFullData) {
    if (prof) {

      //console.log('user logged');
      this.isLogged = true;
      this.apellidoNombre = helperFunctions.getPersonFullName(prof.Profesional.Persona.Nombre,prof.Profesional.Persona.Apellido )

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
  }
}
  loadDefaultPhoto(sexo:number) {

    let imgUrl=AppConstants.ImagesSrc_Woman;
    if(sexo===0){
      imgUrl = AppConstants.ImagesSrc_Man;
    }
    this.profesionalPhotoUrl = imgUrl;

  }
}
