import { Routes, RouterModule } from '@angular/router';
import { LoginComponent } from './commonComponents/login/login.component';
//import { HomeComponent } from './commonComponents/login/login.component';
import { PatientComponent } from './patient/patient.component';
import { PatientMangerComponent } from './patient/patient-manger/patient-manger.component';
import { PersonsComponent } from './persons/persons.component';
import { PruebaComponent } from './prueba/prueba.component';

import { AuthGuard } from './commonComponents/routingGuard/AuthGuard';
import { PageNotFoundComponent }from './commonComponents/page-not-found/page-not-found.component';
 import { TestControlesComponent } from './prueba/testcontroles.component';
 import { TestGridParentComponent } from './prueba/test-grid-parent/test-grid-parent.component';
 import {TestObservablesComponent} from  './prueba/test-observables/test-observables.component';
 import {TestAlertBlocksComponent} from  './prueba/test-alert-blocks/test-alert-blocks.component';
const appRoutes: Routes = [
   { path: 'login', component: LoginComponent },
   //  { path: '', component: HomeComponent, canActivate: [AuthGuard] },
// //    { path: 'persons', component: PersonsComponent },
   
// //    { path: 'persons/:id', component: PersonsComponent },
// //    { path: 'patient', component: PatientComponent },
// //    { path: 'patientEdit/:id', component: PatientMangerComponent },
// //    { path: 'patientCreate', component: PatientMangerComponent },
// //    { path: 'prueba', component: PruebaComponent },
    { path: 'testControles', component: TestControlesComponent },
// //    { path: 'testAgGridParent', component: TestGridParentComponent },
// //    { path: 'testObservables', component: TestObservablesComponent },
// //    { path: 'testAlerts', component: TestAlertBlocksComponent },
   { path: '**', component: PageNotFoundComponent }
];

//TODO:Ver por que en otros desarrollos se usa esto 
//export const rutesModule : ModuleWithProviders = RouterModule.forRoot(appRoutes);
export const rutesModule = RouterModule.forRoot(appRoutes);
