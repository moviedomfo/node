import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { PatientGridComponent } from './components/patient-grid/patient-grid.component';
import { LogingComponent } from './components/loging/loging.component';
import { PatientInfoComponent } from './components/patient-info/patient-info.component';
import { Page404NotFoundComponent } from './commonComponets/page404-not-found/page404-not-found.component';
import { PatientAlertsComponent } from './components/patient-alerts/patient-alerts.component';
import { PatientGridTableComponent } from './components/patient-grid-table/patient-grid-table.component';
import { PatientGridFilterPAginationonServerSideComponent } from './components/patient-grid-filter-paginationon-server-side/patient-grid-filter-paginationon-server-side.component';
import { PatientCardListComponent } from './components/patient-card-list/patient-card-list.component';
import { TestObservablesComponent } from './samples/test-observables/test-observables.component';
import { SampleIndexComponent } from './samples/index/index.component';
import { ComponetsIndexComponent } from './components/componets-index/componets-index.component';



const routes: Routes = [

  { path: '', component: Page404NotFoundComponent },
  { path: 'login', component: LogingComponent },
  {
    path: 'componetsIndex',
    children: [
      { path: 'patientGrid', component: PatientGridComponent },
      { path: 'patientGrid:/id', component: PatientInfoComponent },
      { path: 'patientGridTable', component: PatientGridTableComponent },
      { path: 'PatientGridServerSide', component: PatientGridFilterPAginationonServerSideComponent },
      { path: 'Patient_VirtualScrolling', component: PatientCardListComponent },
      { path: 'patient', component: PatientAlertsComponent },
      { path: '', component: ComponetsIndexComponent, pathMatch: 'full'}
    ]
  },
 
  {
    path: 'samples',//, component: SampleIndexComponent,Si ponemos esto siempre se cargara SampleIndexComponent
    children: [
      {path: 'testObservables',  component: TestObservablesComponent},
      { path: '', component: SampleIndexComponent, pathMatch: 'full'}
    ]
  },
  {
    path: 'testObservables',
    component: TestObservablesComponent
  },

  { path: '**', component: Page404NotFoundComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})


export class AppRoutingModule {

  constructor() { }

  ngOnInit() { }
}
