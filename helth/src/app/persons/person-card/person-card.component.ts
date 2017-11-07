import { Component, OnInit, Input } from '@angular/core';
import { Subject } from 'rxjs/Subject';
import { Observable } from 'rxjs/Observable';
import { PatientsService, CommonService } from '../../service/index';
import { PersonBE, IContextInformation, IParam, Param, CommonValuesEnum, EventType,TipoParametroEnum, CommonParams, HealtConstants } from '../../model/index';
import { FormGroup } from '@angular/forms';
import { ViewChild, ElementRef, Renderer2, AfterContentInit } from '@angular/core';
// Base 64 IMage display issues with unsafe image
import { DomSanitizer } from '@angular/platform-browser';
import { ServiceError } from 'app/model/common.model';
import { AlertBlockComponent } from 'app/commonComponents/alert-block/alert-block.component';
@Component({
  selector: 'app-person-card',
  templateUrl: './person-card.component.html',
  styleUrls: ['./person-card.component.css']
})
export class PersonCardComponent implements AfterContentInit {
  @Input()
  currentPerson: PersonBE;

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

  globalError:ServiceError;
  constructor(
    private patientService: PatientsService,
    private commonService: CommonService,
    private rd: Renderer2) {

  }
  ngOnChanges() {

    if(this.currentPerson.Foto===null)
    {
      this.currentPerson.Sexo==0 ? this.onSexChanged(false):this.onSexChanged(true);
    }
    else
    {
     this.fullImagePath = ''+this.currentPerson.Foto;
    }
  }

  ngAfterViewInit() {   
    
    this.alertBlock1.Show('Hola a todos',true,EventType.Information);
  }

  ngAfterContentInit() {

    //var comboEstadocivil=  (<HTMLInputElement>document.getElementById('cmbEstadoCivil'));
    //console.log("Esto es cmbEstadoCivil");
    //console.log(this.cmbEstadoCivil.nativeElement);
    // console.log(this.comboEstadocivil.nativeElement);

    
    //this.fullImagePath = HealtConstants.ImagesSrc_Man;
    //this.nroDoc = Number(this.currentPerson.NroDocumento);

  }

  loadImg(){
    
    this.fullImagePath = ''+this.currentPerson.Foto;
  }
  
  ngOnInit() {
    this.preInitializePerson();




    this.estadoCivilList$ = this.commonService.searchParametroByParams$(TipoParametroEnum.EstadoCivil, null);
    this.estadoCivilList$.subscribe(
      res => {
        this.estadoCivilList = this.commonService.appendExtraParamsCombo(res, CommonParams.SeleccioneUnaOpcion.IdParametro);
      },
      err=>{
         this.globalError =err;
        //alert(JSON.stringify( e.Message));
      }
    );
    this.tipoDocumentoList$ = this.commonService.searchParametroByParams$(TipoParametroEnum.TipoDocumento, null);
    this.tipoDocumentoList$.subscribe(
      res => {

        this.tipoDocumentoList = this.commonService.appendExtraParamsCombo(res, CommonParams.SeleccioneUnaOpcion.IdParametro);

      }
    );



  }


  byParam(item1: number, item2: number) {
    console.log(JSON.stringify(item1));
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
    console.log(value);
  }

  onSexChanged(inChecked: boolean) {

    if(this.currentPerson.Foto)
    {
     // this.base64Image =''+this.currentPerson.Foto;
      //this.img1.src  = "'data:image/jpg;base64,' + fullImagePath";
      //this.fullImagePath = ''+this.currentPerson.Foto;
      return;
    }

    if (inChecked) {
      this.fullImagePath = HealtConstants.ImagesSrc_Man;
      this.currentPerson.Sexo = 0;
    }
    else {

      this.fullImagePath = HealtConstants.ImagesSrc_Woman;
      this.currentPerson.Sexo = 1;
    }
  }
  nroDoc: number;
  private preInitializePerson() {
    this.fullImagePath = HealtConstants.ImagesSrc_Woman;
    this.currentPerson = new PersonBE(-1, "");
    //this.currentPerson.TipoDocumento=613;
    this.currentPerson.Nombre = "";
    this.currentPerson.TipoDocumento = CommonParams.SeleccioneUnaOpcion.IdParametro.toString();
    this.currentPerson.IdEstadocivil = CommonParams.SeleccioneUnaOpcion.IdParametro;
    this.nroDoc = Number(this.currentPerson.NroDocumento);
  }

}
