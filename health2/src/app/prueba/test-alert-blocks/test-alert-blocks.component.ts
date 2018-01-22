import { Component, OnInit, AfterContentInit, ViewChild, AfterViewInit } from '@angular/core';
import { AlertBlockComponent } from '../../common-components/alert-block/alert-block.component';
import { EventType } from '../../model';

@Component({
  selector: 'app-test-alert-blocks',
  templateUrl: './test-alert-blocks.component.html',
  
})
export class TestAlertBlocksComponent implements AfterViewInit {
  @ViewChild('alertBlock1') alertBlock1: AlertBlockComponent;
  constructor() { }


  ngAfterContentInit(): void {
    //this.alertBlock1.Show('Titulo del Alert ','Mensaje del Alert ----> Hola a todos','Mensaje II ',true, EventType.Information);
  }

  
  

  ngOnInit() {
  }
  ngAfterViewInit() {   
    
    
  }
  private btnShowAlert_click($event){
    this.alertBlock1.Show('Titulo del Alert ','Mensaje del Alert EventType.Information','Mensaje II ',false, EventType.Information);
  }
  private btnShowAlertSuccess_click($event){
    this.alertBlock1.Show('Titulo del Alert ','Mensaje del Alert EventType.Information','Mensaje II ',false, EventType.Success);
  }
  private btnHideAlert_click($event){
    this.alertBlock1.Hide();
  }
}
