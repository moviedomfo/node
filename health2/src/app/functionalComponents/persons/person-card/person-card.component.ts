import { Component, OnInit, Input ,ViewChild, ElementRef, Renderer2, AfterContentInit, AfterViewInit, Output, EventEmitter } from '@angular/core';
import { Subject } from 'rxjs/Subject';
import { Observable } from 'rxjs/Observable';
import { PatientsService, CommonService } from '../../../service/index';
import { PersonBE, IContextInformation, IParam, Param, CommonValuesEnum, EventType,TipoParametroEnum, CommonParams, HealtConstants } from '../../../model/index';
import { FormGroup } from '@angular/forms';
import { } from '@angular/core';
// Base 64 IMage display issues with unsafe image
import { DomSanitizer } from '@angular/platform-browser';

import { AlertBlockComponent } from '../../../commonComponents/alert-block/alert-block.component';
import { ServiceError } from '../../../model/common.model';
import { ControlContainer, NgForm } from '@angular/forms';

@Component({
  selector: 'app-person-card',
  templateUrl: './person-card.component.html', 
  viewProviders: [ { provide: ControlContainer, useExisting: NgForm } ]
  
})
export class PersonCardComponent implements AfterViewInit {
  @Input()
  currentPerson: PersonBE;
  private nroDoc: number;
  private selectedPais: Param;
  private selectedEstadoCivil: number;
  private selectedTipoDoc: number;

  estadoCivilList$: Observable<Param[]>;
  estadoCivilList: Param[];
  tipoDocumentoList$: Observable<Param[]>;
  tipoDocumentoList: Param[];

  fullImagePath: string;
  private base64Image: string;
  @ViewChild('alertBlock1') alertBlock1: AlertBlockComponent;
  @ViewChild('cmbEstadoCivil') cmbEstadoCivil: ElementRef;
  @ViewChild('img2') img2: ElementRef;
  @ViewChild('img1') img1: ElementRef;

  
  @Output() OnComponentError = new EventEmitter<ServiceError>();
  
  constructor(
    private sanitizer: DomSanitizer,
    private patientService: PatientsService,
    private commonService: CommonService,
    private rd: Renderer2) {

  }

  //Se ejecuta antes q ngOnInit
  ngOnChanges() {
    //alert('ngOnChanges person card');
    if(this.currentPerson){
    if(this.currentPerson.Foto===null)
    {
      this.currentPerson.Sexo==0 ? this.onSexChanged(0):this.onSexChanged(1);
    }
    else
    {
     this.fullImagePath = ''+this.currentPerson.Foto;
    }
  }
  }

  ngAfterViewInit() {   
    
  }

  ngOnInit() {

    

    this.tipoDocumentoList$ = this.commonService.searchParametroByParams$(TipoParametroEnum.TipoDocumento, null);
    this.tipoDocumentoList$.subscribe(
      res => {
       this.tipoDocumentoList = this.commonService.appendExtraParamsCombo(res, CommonParams.SeleccioneUnaOpcion.IdParametro);
      },
      err => 
      {
     
        this.OnComponentError.emit(err); 
      }
    );
    this.estadoCivilList$ = this.commonService.searchParametroByParams$(TipoParametroEnum.EstadoCivil, null);
    this.estadoCivilList$.subscribe(
      res => {
        this.estadoCivilList = this.commonService.appendExtraParamsCombo(res, CommonParams.SeleccioneUnaOpcion.IdParametro);
      },
      err => {
        // console.info('result de llamada al servicio searchParametroByParams');
        // console.info(err.error);
        //alert('handleError' +  JSON.stringify(err));
        this.OnComponentError.emit(err);
      }
    );
    this.preInitializePerson();
  }


  byParam(item1: number, item2: number) {
    //console.log(JSON.stringify(item1));
    return item1 === item2;

  }
  onPaisSelection(event) {
    //alert(this.selectedPais); 
  }

  onEstadoCivilSelection(event) {
    // console.log(event);
    // console.log(this.selectedEstadoCivil);

  }

  txtBox_NroDocumento_onKeyEnter(value: string) {
    //this.txtQuery += value + ' | ';
   // console.log(value);
  }

  onSexChanged(sexo: number) {

    if(this.currentPerson.Foto)
    {
     // this.base64Image =''+this.currentPerson.Foto;
      //this.img1.src  = "'data:image/jpg;base64,' + fullImagePath";
      //this.fullImagePath = ''+this.currentPerson.Foto;
      return;
    }
    
    if (sexo===0) { //Hombre
      this.fullImagePath = HealtConstants.ImagesSrc_Man;
      this.currentPerson.Sexo = 0;
    }
    if (sexo===1){
    //Mujer
      this.fullImagePath = HealtConstants.ImagesSrc_Woman;
      this.currentPerson.Sexo = 1;
    }
  }
  loadImg(){
    
    this.fullImagePath = ''+this.currentPerson.Foto;
  }
  loadImage(){
    if (this.currentPerson.Sexo === 0) {
      return(this.photoURL(HealtConstants.ImagesSrc_Man));
      
    }
    else {

      return this.photoURL(HealtConstants.ImagesSrc_Woman);
      
    }
  }
  photoURL(imgUrl) {
    return this.sanitizer.bypassSecurityTrustUrl(imgUrl);
  }

  private preInitializePerson() {


    this.fullImagePath = HealtConstants.ImagesSrc_Man;
    if (this.currentPerson == null) {

      this.currentPerson = new PersonBE(-1, "");

      //alert(JSON.stringify(this.currentPerson));
      this.currentPerson.Nombre = "";
      //this.currentPerson.TipoDocumento = CommonParams.SeleccioneUnaOpcion.IdParametro.toString();
      this.currentPerson.TipoDocumento = CommonParams.SeleccioneUnaOpcion.IdParametro.toString();
      this.currentPerson.IdEstadocivil = CommonParams.SeleccioneUnaOpcion.IdParametro;
      this.currentPerson.FechaNacimiento = new Date();
      this.currentPerson.NroDocumento = "0";
      this.nroDoc = Number(this.currentPerson.NroDocumento);
    }
  }

}
