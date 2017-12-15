import { Component, OnInit, ViewEncapsulation, Input } from '@angular/core';
import { ResourceSchedulingBE } from "../../model/profesional.model";

@Component({
  selector: 'app-week-days-check-edit',
  templateUrl: './week-days-check-edit.component.html',
  styleUrls: ['./week-days-check-edit.component.css'],
  encapsulation: ViewEncapsulation.None
})
export class WeekDaysCheckEditComponent implements OnInit {

  constructor() { }
  @Input()  WeekDays:number;

  resourceSchedulingBE:ResourceSchedulingBE;

  ngOnInit() {
  }
  
  set_weekDays(weekDays:number){
    
        
      }

  on_chk(value:number,checked:boolean){

    
    this.resourceSchedulingBE = new  ResourceSchedulingBE();

    if(checked)
      this.WeekDays = this.WeekDays + value;
      else
      this.WeekDays = this.WeekDays - value;

    this.resourceSchedulingBE.WeekDays = this.WeekDays;
    this.resourceSchedulingBE.Get_WeekDays_BinArray();
  }

  show()
  {
    alert( this.resourceSchedulingBE.Get_WeekDays_BinArray());
  }
}
