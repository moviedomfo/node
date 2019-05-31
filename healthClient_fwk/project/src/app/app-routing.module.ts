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



const routes: Routes = [
  
  { path: '', component: Page404NotFoundComponent },
  { path: 'login', component: LogingComponent },
  { path: 'patientGrid', component: PatientGridComponent },
  { path: 'patientGrid:/id', component: PatientInfoComponent },
  { path: 'patientGridTable', component: PatientGridTableComponent },
  { path: 'PatientGridServerSide', component: PatientGridFilterPAginationonServerSideComponent },
  { path: 'Patient_VirtualScrolling', component: PatientCardListComponent },
  
  { path: 'patient', component: PatientAlertsComponent },
  { path: '**', component: Page404NotFoundComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})


export class AppRoutingModule {

   constructor(){}

   ngOnInit(){  }
 }
