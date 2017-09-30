import { Component, OnInit } from '@angular/core';
import { DatePipe } from '@angular/common';
import { Subject } from 'rxjs/Subject';
import { Observable } from 'rxjs/Observable';
import { PersonBE, IContextInformation, IParam, Param, CommonValuesEnum, TipoParametroEnum, CommonParams, HealtConstants } from '../model/index';
import { PatientsService, CommonService } from '../service/index';
import { FormGroup } from '@angular/forms';
import { ViewChild, ElementRef, Renderer2, AfterContentInit } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import {  MdDatepicker,MdDatepickerInput }  from '@angular/material';
interface Friend {
    id: number;
    name: string;
}
@Component({
    selector: 'app-prueba',
    templateUrl: './prueba.component.html',
    providers: [DatePipe]
})


export class PruebaComponent implements OnInit {

    private fechaAlta:Date;
    private currentPerson: PersonBE;
    tipoDocumentoList$: Observable<Param[]>;
    tipoDocumentoList: Param[]

    constructor(private commonService: CommonService,private datePipe: DatePipe ) {

    }


    ngOnngAfterContentInit  (){
        //alert('ngOnngAfterContentInit');
        //this.preInitializePerson();
        
    }

    private fechaAltaString:string;
    ngOnInit() {
        this.fechaAlta = new Date();
        this.fechaAltaString=this.fechaAlta.toISOString();
        
        this.preInitializePerson();
        this.tipoDocumentoList$ = this.commonService.searchParametroByParams$(TipoParametroEnum.TipoDocumento, null);
        this.tipoDocumentoList$.subscribe(
            res => {

                this.tipoDocumentoList = this.commonService.appendExtraParamsCombo(res, CommonParams.SeleccioneUnaOpcion.IdParametro);
                
            }
        );
    }
    private cambiarPersona(){
        this.currentPerson.TipoDocumento = "610";
        this.currentPerson.Nombre = "Marcelo";
       }
    private  preInitializePerson()
    {
       
       this.currentPerson = new PersonBE(-1,"pepe");
       this.currentPerson.TipoDocumento="610";
       //this.currentPerson.TipoDocumento = CommonParams.SeleccioneUnaOpcion.IdParametro.toString();
    }

}
