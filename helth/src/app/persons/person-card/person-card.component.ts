import { Component, OnInit ,Input} from '@angular/core';
import { Subject } from 'rxjs/Subject';
import { Observable } from 'rxjs/Observable';
import { PatientsService, CommonService } from '../../service/index';
import { PersonBE, IContextInformation, IParam, Param, CommonValuesEnum, TipoParametroEnum, CommonParams, HealtConstants } from '../../model/index';
import { FormGroup } from '@angular/forms';
import { ViewChild, ElementRef, Renderer2, AfterContentInit } from '@angular/core';

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
  paises$: Observable<Param[]>;
  paises: Param[];
  estadoCivilList$: Observable<Param[]>;
  estadoCivilList: Param[];
  tipoDocumentoList$: Observable<Param[]>;
  tipoDocumentoList: Param[];

  fullImagePath: string;

  @ViewChild('cmbEstadoCivil') cmbEstadoCivil: ElementRef;

  constructor(
    private patientService: PatientsService,
    private commonService: CommonService,
    private rd: Renderer2) {

  }
  ngOnChanges() {
    

  }
  ngAfterViewInit() {

  }
  ngAfterContentInit() {

       //var comboEstadocivil=  (<HTMLInputElement>document.getElementById('cmbEstadoCivil'));
       //console.log("Esto es cmbEstadoCivil");
      //console.log(this.cmbEstadoCivil.nativeElement);
    // console.log(this.comboEstadocivil.nativeElement);

  
   //this.fullImagePath = HealtConstants.ImagesSrc_Man;
   this.nroDoc = Number(this.currentPerson.NroDocumento);


  }
  ngOnInit() {
    this.preInitializePerson();
    

   
    this.paises$ = this.commonService.searchParametroByParams$(TipoParametroEnum.Paises, null);
    this.paises$.subscribe(
      res => {
        this.paises = res;
      }
    );
    this.estadoCivilList$ = this.commonService.searchParametroByParams$(TipoParametroEnum.EstadoCivil, null);
    this.estadoCivilList$.subscribe(
      res => {
        this.estadoCivilList = this.commonService.appendExtraParamsCombo(res, CommonParams.SeleccioneUnaOpcion.IdParametro);
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

    if (inChecked) {
      this.fullImagePath = HealtConstants.ImagesSrc_Man;
      this.currentPerson.Sexo = 0;
    }
    else {
      
      this.fullImagePath = HealtConstants.ImagesSrc_Woman;
      this.currentPerson.Sexo = 1;
    }
  }
  nroDoc:number;
  private  preInitializePerson()
  {
    this.fullImagePath = HealtConstants.ImagesSrc_Woman;
     this.currentPerson = new PersonBE(-1,"");
     //this.currentPerson.TipoDocumento=613;
     this.currentPerson.Nombre="";
     this.currentPerson.TipoDocumento = CommonParams.SeleccioneUnaOpcion.IdParametro.toString();
     this.currentPerson.IdEstadocivil =CommonParams.SeleccioneUnaOpcion.IdParametro;
     this.nroDoc = Number(this.currentPerson.NroDocumento);
  }

}
