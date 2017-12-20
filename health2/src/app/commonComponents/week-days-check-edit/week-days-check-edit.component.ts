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
  @Input() WeekDays: number;

  chkDays: chkDays;
  private resourceSchedulingBE: ResourceSchedulingBE;
  private weekdays_to_bin_Array: boolean [];
  ngOnInit() {
    this.resourceSchedulingBE = new ResourceSchedulingBE();
    this.WeekDays = 0;

    this.chkDays = new chkDays();

  }

  set_weekDays(weekDays: number) {


  }

  on_chk(value: number, checked: boolean ) {


    this.resourceSchedulingBE = new ResourceSchedulingBE();

    if (value === 127) {
      this.chkDays.chkDomingo = checked;
      this.chkDays.chkLunes = checked;
      this.chkDays.chkMartes = checked;
      this.chkDays.chkMiercoles = checked;
      this.chkDays.chkJueves = checked;
      this.chkDays.chkViernes = checked;
      this.chkDays.chkSabado = checked;
      this.WeekDays = value;
      if (checked === true)
        this.WeekDays = value; 
        else
        this.WeekDays = 0; 

      this.resourceSchedulingBE.WeekDays = this.WeekDays;
      this.weekdays_to_bin_Array = this.resourceSchedulingBE.Get_WeekDays_BinArray();
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
      this.WeekDays = this.WeekDays + value;
    }
    else {
      //  console.log('Resta ' + value);
      this.WeekDays = this.WeekDays - value;
    }


    this.resourceSchedulingBE.WeekDays = this.WeekDays;
    this.weekdays_to_bin_Array = this.resourceSchedulingBE.Get_WeekDays_BinArray();
  }

  show() {
    alert(this.resourceSchedulingBE.Get_WeekDays_BinArray());
  }
}
