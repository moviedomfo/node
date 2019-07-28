import { Component, OnInit, Input, ViewChild, ElementRef, Renderer2, AfterContentInit, AfterViewInit, Output, EventEmitter } from '@angular/core';

import { Observable } from 'rxjs';
import { PersonsService, CommonService } from '../../../service/index';
import { PersonBE, IContextInformation, IParam, Param, CommonValuesEnum, EventType, TipoParametroEnum, CommonParams, AppConstants, MotivoConsultaEnum } from '../../../model/index';
import { FormGroup } from '@angular/forms';
import { } from '@angular/core';
// Base 64 IMage display issues with unsafe image
import { DomSanitizer } from '@angular/platform-browser';

import { AlertBlockComponent } from '../../../common-components/alert-block/alert-block.component';
import { ServiceError } from '../../../model/common.model';
import { ControlContainer, NgForm } from '@angular/forms';
declare var jQuery: any;
declare var $: any;

@Component({
  selector: 'app-person-card',
  templateUrl: './person-card.component.html',
  viewProviders: [{ provide: ControlContainer, useExisting: NgForm }]

})
export class PersonCardComponent implements AfterViewInit {
  @Input() currentPerson: PersonBE;
  private currentPerson$: Observable<PersonBE>;
  @Input() motivoConsulta: number;

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

  currentNroDocumento: string;
  @ViewChild('alertBlock1',{ static: false }) alertBlock1: AlertBlockComponent;
  @ViewChild('cmbEstadoCivil',{ static: false }) cmbEstadoCivil: ElementRef;
  @ViewChild('img2',{ static: false }) img2: ElementRef;
  @ViewChild('img1',{ static: false }) img1: ElementRef;


  @Output() OnComponentError = new EventEmitter<ServiceError>();

  constructor(
    private sanitizer: DomSanitizer,
    private personService: PersonsService,
    private commonService: CommonService,
    private rd: Renderer2) {

  }

  //Se ejecuta antes q ngOnInit
  ngOnChanges() {
    this.currentNroDocumento = this.currentPerson.NroDocumento;

    //alert('ngOnChanges person card');
    if (this.currentPerson) {
      if (this.currentPerson.Foto === null) {
        this.currentPerson.Sexo == 0 ? this.onSexChanged(0) : this.onSexChanged(1);
      }
      else {
        this.fullImagePath = '' + this.currentPerson.Foto;
      }
    }
  }

  ngAfterViewInit() {
  
  }

  ngOnInit() {


    this.currentNroDocumento = this.currentPerson.NroDocumento;
    
    this.tipoDocumentoList$ = this.commonService.searchParametroByParams$(TipoParametroEnum.TipoDocumento, null);
    this.tipoDocumentoList$.subscribe(
      res => {
        this.tipoDocumentoList = this.commonService.appendExtraParamsCombo(res, CommonParams.SeleccioneUnaOpcion.IdParametro);
      },
      err => {

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
  onPersonGridDoubleClick($event) {

    this.currentPerson = $event as PersonBE;

    $('#findPersonModal').modal('hide');
  }

  txtBox_NroDocumento_onKeyEnter(value: string) {
    //this.txtQuery += value + ' | ';
    // console.log(value);
  }
  txtBox_NroDocumento_onBlur() {
    this.validate_txtDocumento();
  }
  onSexChanged(sexo: number) {

    if (this.currentPerson.Foto) {
      // this.base64Image =''+this.currentPerson.Foto;
      //this.img1.src  = "'data:image/jpg;base64,' + fullImagePath";
      //this.fullImagePath = ''+this.currentPerson.Foto;
      return;
    }

    if (sexo === 0) { //Hombre
      this.fullImagePath = AppConstants.ImagesSrc_Man;
      this.currentPerson.Sexo = 0;
    }
    if (sexo === 1) {
      //Mujer
      this.fullImagePath = AppConstants.ImagesSrc_Woman;
      this.currentPerson.Sexo = 1;
    }
  }
  loadImg() {

    this.fullImagePath = '' + this.currentPerson.Foto;
  }
  loadImage() {
    if (this.currentPerson.Sexo === 0) {
      return (this.photoURL(AppConstants.ImagesSrc_Man));

    }
    else {

      return this.photoURL(AppConstants.ImagesSrc_Woman);

    }
  }
  photoURL(imgUrl) {
    return this.sanitizer.bypassSecurityTrustUrl(imgUrl);
  }

  private preInitializePerson() {


    this.fullImagePath = AppConstants.ImagesSrc_Man;
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


  validate_txtDocumento(): boolean {




    this.currentPerson.NroDocumento = this.currentPerson.NroDocumento.trim();

    if (!this.currentPerson.NroDocumento || this.currentPerson.NroDocumento.trim() == '')
      return true;
    if (this.currentPerson.NroDocumento.trim() == this.currentNroDocumento.trim())
      return true;

    this.currentPerson$ = this.personService.getPersonaByParamService$(null, this.currentPerson.NroDocumento);

    this.currentPerson$.subscribe(
      res => {
        var person: PersonBE = res as PersonBE;
        
        if (person == null) {
          return true;
        }
        //console.log(JSON.stringify(person));
        //console.log('MotivoConsultaEnum = ' + this.motivoConsulta); 

        if (this.motivoConsulta == MotivoConsultaEnum.ActualizarPaciente ||
          this.motivoConsulta == MotivoConsultaEnum.CrearPaciente
        ) {
          alert("El Nro de doc ingresado pertenece a " + PersonBE.getFullName(person.Apellido, person.Nombre) + " Si la persona que quiere crear/modificar posee este documento \r\n cierre esta pantalla y valla a buscar paciente actualice sus datos");
          return false;
        }

        if (this.motivoConsulta == MotivoConsultaEnum.ActualizarProfesional ||
          this.motivoConsulta == MotivoConsultaEnum.CrearProfesional
        ) {

          alert("El Nro de doc ingresado pertenece a " + PersonBE.getFullName(person.Apellido, person.Nombre) + " El profesional es esta persona?");

          // if (res == DialogResult.Yes)
          // {

          //     Persona = persona;

          //     Populate(Persona, Fwk.Bases.EntityUpdateEnum.UPDATED);

          //     PersonaChanged(this, new EventArgs());
          //     return true;
          // }


          return false;
        }

      },
      err => {
        alert(err.Message);
        //this.globalError = err;
      }
    );






    return true;
  }
}
