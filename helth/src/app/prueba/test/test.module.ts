import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {AgGridModule} from 'ag-grid-angular/main';
// commonComponents rich grid and rich grid declarative
import {DateComponent} from '../../commonComponents/ag-grid/date.component';
import {HeaderComponent} from '../../commonComponents/ag-grid/header.component';
import {HeaderGroupComponent} from '../../commonComponents/ag-grid/header-group.component';
import { PruebaComponent } from '../prueba.component';
              
import { TestControlesComponent } from '../testcontroles.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AggridTestComponent } from '../test-grid-parent/aggrid-test/aggrid-test.component';
import { TestGridParentComponent } from '../test-grid-parent/test-grid-parent.component';
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
    TestGridParentComponent
    // TablaComponent
  ]
})
export class TestModule { }
