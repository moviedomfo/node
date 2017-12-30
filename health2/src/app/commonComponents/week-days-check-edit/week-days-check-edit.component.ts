import { Component, OnInit, ViewEncapsulation, Input } from '@angular/core';
import { ResourceSchedulingBE } from "../../model/profesional.model";
import { chkDays } from "../../model/common.model";

@Component({
  selector: 'app-week-days-check-edit',
  templateUrl: './week-days-check-edit.component.html',

  encapsulation: ViewEncapsulation.None
})

export class WeekDaysCheckEditComponent implements OnInit {

  constructor() { }
//  @Input() WeekDays: number;

  chkDays: chkDays;
  @Input()
  resourceSchedulingBE: ResourceSchedulingBE;
  private weekdays_to_bin_Array: boolean [];


  ngOnInit() {
    if(!this.resourceSchedulingBE)
    {
    this.resourceSchedulingBE = new ResourceSchedulingBE();
    }
    
    this.resourceSchedulingBE.WeekDays = 0;

    this.chkDays = new chkDays();

  }

  set_weekDays(weekDays: number) {


  }

  on_chk(value: number, checked: boolean ) {


    //this.resourceSchedulingBE = new ResourceSchedulingBE();

    if (value === 127) {
      this.chkDays.chkDomingo = checked;
      this.chkDays.chkLunes = checked;
      this.chkDays.chkMartes = checked;
      this.chkDays.chkMiercoles = checked;
      this.chkDays.chkJueves = checked;
      this.chkDays.chkViernes = checked;
      this.chkDays.chkSabado = checked;
      this.resourceSchedulingBE.WeekDays = value;
      if (checked === true)
        this.resourceSchedulingBE.WeekDays = value; 
        else
        this.resourceSchedulingBE.WeekDays = 0; 

     // this.resourceSchedulingBE.WeekDays = this.resourceSchedulingBE.WeekDays;
     // this.weekdays_to_bin_Array = this.resourceSchedulingBE.Get_WeekDays_BinArray();

      return;
    }

    //Si estaba chequeado Todos
    if( this.chkDays.chkTodos)
    {
      //this.WeekDays = this.WeekDays - 127;
      this.chkDays.chkTodos=false;
    }
    
    if (checked === true) {
      //console.log('Suma ' + value);
      this.resourceSchedulingBE.WeekDays = this.resourceSchedulingBE.WeekDays + value;
    }
    else {
        //console.log('Resta ' + value);
      this.resourceSchedulingBE.WeekDays = this.resourceSchedulingBE.WeekDays - value;
    }

    
    
    this.weekdays_to_bin_Array = this.resourceSchedulingBE.Get_WeekDays_BinArray();

    
  }

  Init(){
    if(!this.chkDays) return;
    let checked:boolean=false;
    this.chkDays.chkDomingo = checked;
    this.chkDays.chkLunes = checked;
    this.chkDays.chkMartes = checked;
    this.chkDays.chkMiercoles = checked;
    this.chkDays.chkJueves = checked;
    this.chkDays.chkViernes = checked;
    this.chkDays.chkSabado = checked;
    this.chkDays.chkTodos = checked;
    
  }
  show() {
    alert(this.resourceSchedulingBE.Get_WeekDays_BinArray());
  }
}
