import { Component, AfterContentInit ,Input} from '@angular/core';

import { Observable } from 'rxjs';
import { PatientsService, CommonService } from '../../../service/index';
import { PersonBE, IContextInformation, IParam, Param, CommonValuesEnum, TipoParametroEnum, CommonParams, HealtConstants } from '../../../model/index';


@Component({
  selector: 'app-person-address',
  templateUrl: './person-address.component.html',
  styleUrls: ['./person-address.component.css']
})
export class PersonAddressComponent implements AfterContentInit {
  @Input() 
  currentPerson: PersonBE;
  paises$: Observable<Param[]>;
  paises: Param[];
  provincia$: Observable<Param[]>;
  provincia: Param[];

  city$: Observable<Param[]>;
  city: Param[];
  
  constructor( private patientService: PatientsService,
    private commonService: CommonService) { }

  ngAfterContentInit() {}

  ngOnInit() {
    this.preInitializePerson();

    this.paises$ = this.commonService.searchParametroByParams$(TipoParametroEnum.Paises, null);
    this.paises$.subscribe(
      res => {
        this.paises = res;
      }
    );
  this.provincia$ = this.commonService.searchParametroByParams$(TipoParametroEnum.Provincia, null);
    this.provincia$.subscribe(
      res => {
        this.provincia = res;
      }
    );
    
  }
  private  preInitializePerson()
  {
    
     
     
    //  this.currentPerson.Street = "";
    //  this.currentPerson.StreetNumber = -1;
    //  this.currentPerson.Floor = "";

    //  this.currentPerson.Telefono1 = "";
    //  this.currentPerson.Telefono2 = "";

    //  this.currentPerson.ProvinceId = CommonParams.SeleccioneUnaOpcion.IdParametro;
    //  this.currentPerson.CountryId = CommonParams.SeleccioneUnaOpcion.IdParametro;
    //  this.currentPerson.CityId = CommonParams.SeleccioneUnaOpcion.IdParametro;
  }
}
