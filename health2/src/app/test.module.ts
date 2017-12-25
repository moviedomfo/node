import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {AgGridModule} from 'ag-grid-angular/main';
// commonComponents rich grid and rich grid declarative
import {DateComponent} from './commonComponents/ag-grid/date.component';
import {HeaderComponent} from './commonComponents/ag-grid/header.component';
import {HeaderGroupComponent} from './commonComponents/ag-grid/header-group.component';
import { PruebaComponent } from './prueba/prueba.component';
              
import { TestControlesComponent } from './prueba/testcontroles.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AggridTestComponent } from './prueba/test-grid-parent/aggrid-test/aggrid-test.component';
import { TestGridParentComponent } from './prueba/test-grid-parent/test-grid-parent.component';
import {TestObservablesChildComponent} from './prueba/test-observables/test-observables-child/test-observables-child.component';
import {TestObservablesComponent} from './prueba/test-observables/test-observables.component';

import { TestTimesComponent } from './prueba/test-times/test-times.component';
//import { TestAlertBlocksComponent } from "./prueba/test-alert-blocks/test-alert-blocks.component";
//import { AlertBlockComponent } from './commonComponents/alert-block/alert-block.component';

// import {TablaComponent} from '../../tabla/tabla.component';
@NgModule({
  imports: [
    CommonModule, 
    FormsModule    ,   AgGridModule.withComponents([
      DateComponent,
      HeaderComponent,
      HeaderGroupComponent
]),
  ],
  declarations: [PruebaComponent,
    TestControlesComponent,AggridTestComponent    ,
    TestGridParentComponent,
     TestObservablesChildComponent,
     TestObservablesComponent,
     
     TestTimesComponent
     //TestAlertBlocksComponent,
     //AlertBlockComponent
  ]
})
export class TestModule { }
