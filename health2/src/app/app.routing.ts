import { Routes, RouterModule } from '@angular/router';
import { LoginComponent } from './common-components/login/login.component';
//import { HomeComponent } from './common-components/login/login.component';
import { PatientComponent } from './functionalComponents/patient/patient.component';
import { PatientMangerComponent } from './functionalComponents/patient/patient-manger/patient-manger.component';
import { PatientCreateComponent } from './functionalComponents/patient/patient-create/patient-create.component';
import { ProfesionalManageComponent } from './functionalComponents/profesional/profesional-manage/profesional-manage.component';
import { PersonsComponent } from './functionalComponents/persons/persons.component';
import { PruebaComponent } from './prueba/prueba.component';

import { AuthGuard } from './common-components/routingGuard/AuthGuard';
import { PageNotFoundComponent }from './common-components/page-not-found/page-not-found.component';
 import { TestControlesComponent } from './prueba/testcontroles.component';
 import { TestGridParentComponent } from './prueba/test-grid-parent/test-grid-parent.component';
 import {TestObservablesComponent} from  './prueba/test-observables/test-observables.component';
 import {TestTimesComponent} from  './prueba/test-times/test-times.component';
import { FormsComponent } from "./prueba/forms/forms.component";
//import { TestRangeIntersectionComponent } from "./prueba/test-times/test-range-intersection.component";
import { IntersectionsComponent } from './prueba/test-times/intersections/intersections.component';
import { CheckBoxListComponent } from "./prueba/check-box-list/check-box-list.component";
import { ProfesionalGridComponent } from "./functionalComponents/profesional/profesionalGrid/profesionalGrid.component";
import { PersonGridComponent } from "./functionalComponents/persons/person-grid/person-grid.component";
import { PatientGridComponent } from "./functionalComponents/patient/patient-grid/patient-grid.component";
import { FormControlsComponent } from "./prueba/forms/form-controls/form-controls.component";
import { FormControlsAdminLteComponent } from "./prueba/forms/form-controls-admin-lte/form-controls-admin-lte.component";
import { TestServiceCallComponent } from './prueba/test-service-call/test-service-call.component';
import { AutocompleteComponent } from './prueba/autocomplete/autocomplete.component';
import { AngGridTestBasicComponent } from './prueba/test-grid-parent/ang-grid-test-basic/ang-grid-test-basic.component';
import { HomeComponent } from './common-components/home/home.component';
 


const appRoutes: Routes = [
   { path: 'login', component: LoginComponent },
     { path: '', component: HomeComponent },
    { path: 'personsGrid', component: PersonGridComponent ,canActivate: [AuthGuard]},
   { path: 'patientEdit/:id', component: PatientMangerComponent,canActivate: [AuthGuard] },
   { path: 'patientCreate', component: PatientMangerComponent ,canActivate: [AuthGuard]},
   { path: 'patientList', component: PatientGridComponent,canActivate: [AuthGuard] },
    
    { path: 'profesionalCreate', component: ProfesionalManageComponent,canActivate: [AuthGuard] },
    { path: 'profesionalEdit/:id', component: ProfesionalManageComponent ,canActivate: [AuthGuard]},
    { path: 'profesionalGrid', component: ProfesionalGridComponent ,canActivate: [AuthGuard]},
    
    
    { path: 'testControles', component: TestControlesComponent },
   { path: 'testTimes', component: TestTimesComponent },
   { path: 'testFormsValidations', component: FormsComponent },
   { path: 'testFormsControls', component: FormControlsComponent },
    { path: 'TestIntersection', component: IntersectionsComponent },
    { path: 'testFormsControlsAdminLTE', component: FormControlsAdminLteComponent },
     { path: 'CheckBoxList', component: CheckBoxListComponent },
     { path: 'testServiceCalls', component: TestServiceCallComponent },
     { path: 'testGoogleMaps', component: AutocompleteComponent },
     { path: 'AngGridTestBasic', component: AngGridTestBasicComponent },
     { path: 'testGridParent', component: TestGridParentComponent },
          
   { path: '**', component: PageNotFoundComponent }

];

//TODO:Ver por que en otros desarrollos se usa esto 
//export const rutesModule : ModuleWithProviders = RouterModule.forRoot(appRoutes);
export const rutesModule = RouterModule.forRoot(appRoutes);

