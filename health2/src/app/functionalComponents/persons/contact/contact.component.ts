
import { Component, OnInit, ViewEncapsulation ,Input,Output,EventEmitter} from '@angular/core';
import {  PersonBE,  User, IContextInformation, IParam, Param, CommonValuesEnum, TipoParametroEnum, CommonParams, HealtConstants, contextInfo, Rol } from '../../../model/index';
import { PlaceBE } from "../../../model/persons.model";
@Component({
  selector: 'app-contact',
  templateUrl: './contact.component.html',

  encapsulation: ViewEncapsulation.None
})
export class ContactComponent implements OnInit {

  @Input()    public currentPerson: PersonBE;
  currentPlace:PlaceBE;
  constructor() { }


  ngAfterViewInit(): void {
   
  }

  ngOnInit() {
    if(!this.currentPlace)
    {
      this.currentPlace = new PlaceBE();
    
    }
  }

  onPlaceChanged(placeBE:PlaceBE){
    
   

    if(!this.currentPerson.places)
    {
      this.currentPerson.places = [];
    }
    
    let exist = this.currentPerson.places.find(p=>p.place_id==placeBE.place_id);
    if(exist)
    {
      alert(placeBE.formatted_address + ' ya existe' );
      return;
    }
    this.currentPlace= placeBE;
    
  }


  btnAddPlace_click(){
    
    this.currentPerson.places.push(this.currentPlace);
  }
}
