import { Routes, RouterModule } from '@angular/router';
import { LoginComponent } from './commonComponents/login/login.component';
//import { HomeComponent } from './commonComponents/login/login.component';
import { PatientComponent } from './patient/patient.component';
import { PersonsComponent } from './persons/persons.component';
import { PruebaComponent } from './prueba/prueba.component';

import { AuthGuard } from './commonComponents/routingGuard/AuthGuard';
import { PageNotFoundComponent }from './commonComponents/page-not-found/page-not-found.component';
const appRoutes: Routes = [
   { path: 'login', component: LoginComponent },
   //  { path: '', component: HomeComponent, canActivate: [AuthGuard] },
   { path: 'persons', component: PersonsComponent },
   { path: 'persons/:id', component: PersonsComponent },
   { path: 'patient', component: PatientComponent },
   { path: 'prueba', component: PruebaComponent },
   
   { path: '**', component: PageNotFoundComponent }
];

//TODO:Ver por que en otros desarrollos se usa esto 
//export const rutesModule : ModuleWithProviders = RouterModule.forRoot(appRoutes);
export const rutesModule = RouterModule.forRoot(appRoutes);
