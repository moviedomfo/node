import { Routes, RouterModule } from '@angular/router';
import { LoginComponent } from './commonComponents/login/login.component';
//import { HomeComponent } from './commonComponents/login/login.component';
import { PatientComponent } from './functionalComponents/patient/patient.component';
import { PatientMangerComponent } from './functionalComponents/patient/patient-manger/patient-manger.component';
import { PatientCreateComponent } from './functionalComponents/patient/patient-create/patient-create.component';
import { ProfesionalManageComponent } from './functionalComponents/profesional/profesional-manage/profesional-manage.component';
import { PersonsComponent } from './functionalComponents/persons/persons.component';
import { PruebaComponent } from './prueba/prueba.component';

import { AuthGuard } from './commonComponents/routingGuard/AuthGuard';
import { PageNotFoundComponent }from './commonComponents/page-not-found/page-not-found.component';
 import { TestControlesComponent } from './prueba/testcontroles.component';
 import { TestGridParentComponent } from './prueba/test-grid-parent/test-grid-parent.component';
 import {TestObservablesComponent} from  './prueba/test-observables/test-observables.component';
 import {TestTimesComponent} from  './prueba/test-times/test-times.component';
import { FormsComponent } from "./prueba/forms/forms.component";
//import { TestRangeIntersectionComponent } from "./prueba/test-times/test-range-intersection.component";
import { IntersectionsComponent } from './prueba/test-times/intersections/intersections.component';
 
 


const appRoutes: Routes = [
   { path: 'login', component: LoginComponent },
   //  { path: '', component: HomeComponent, canActivate: [AuthGuard] },
// //    { path: 'persons', component: PersonsComponent },
   
// //    { path: 'persons/:id', component: PersonsComponent },
// //    { path: 'patient', component: PatientComponent },
   { path: 'patientEdit/:id', component: PatientMangerComponent },
   { path: 'patientCreate', component: PatientMangerComponent },
   { path: 'patient', component: PatientComponent },
// //    { path: 'prueba', component: PruebaComponent },
    { path: 'testControles', component: TestControlesComponent },
    { path: 'profesionalCreate', component: ProfesionalManageComponent },
    { path: 'profesionalEdit/:id', component: ProfesionalManageComponent },
    
    { path: 'testTimes', component: TestTimesComponent },
   { path: 'testFormsValidations', component: FormsComponent },
    { path: 'TestIntersection', component: IntersectionsComponent },
    // { path: 'testAlerts', component: TestAlertBlocksComponent },

   { path: '**', component: PageNotFoundComponent }

];

//TODO:Ver por que en otros desarrollos se usa esto 
//export const rutesModule : ModuleWithProviders = RouterModule.forRoot(appRoutes);
export const rutesModule = RouterModule.forRoot(appRoutes);
