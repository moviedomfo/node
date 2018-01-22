import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {AgGridModule} from 'ag-grid-angular/main';
// common-components rich grid and rich grid declarative
import {DateComponent} from './common-components/ag-grid/date.component';
import {HeaderComponent} from './common-components/ag-grid/header.component';
import {HeaderGroupComponent} from './common-components/ag-grid/header-group.component';
import { PruebaComponent } from './prueba/prueba.component';
              
import { TestControlesComponent } from './prueba/testcontroles.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AggridTestComponent } from './prueba/test-grid-parent/aggrid-test/aggrid-test.component';
import { TestGridParentComponent } from './prueba/test-grid-parent/test-grid-parent.component';
import {TestObservablesChildComponent} from './prueba/test-observables/test-observables-child/test-observables-child.component';
import {TestObservablesComponent} from './prueba/test-observables/test-observables.component';

import { TestTimesComponent } from './prueba/test-times/test-times.component';
import { AutocompleteComponent } from './prueba/autocomplete/autocomplete.component';
//import { TestAlertBlocksComponent } from "./prueba/test-alert-blocks/test-alert-blocks.component";
//import { AlertBlockComponent } from './common-components/alert-block/alert-block.component';

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
     
     TestTimesComponent,
     
     AutocompleteComponent
     //TestAlertBlocksComponent,
     //AlertBlockComponent
  ]
})
export class TestModule { }
