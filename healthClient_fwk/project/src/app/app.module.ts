import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { AgmCoreModule } from '@agm/core';
import { AlertBlockComponent } from './commonComponets/alert-block/alert-block.component';
import { ErrorBoxContainerComponent } from './commonComponets/error-box-container/error-box-container.component';
import { Page404NotFoundComponent } from './commonComponets/page404-not-found/page404-not-found.component';
import { PatientGridComponent } from './components/patient-grid/patient-grid.component';
import { CommonService } from './service/common.service';

import { PatientsService } from './service/patients.service';
import { FwkDocumentService } from './service/fwkSvcAlerts.service'
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MaterialModule } from './material-module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatNativeDateModule, MatToolbarModule, MatButtonModule, MatSidenavModule, MatIconModule, MatListModule } from '@angular/material';
import { PatientAlertsComponent } from './components/patient-alerts/patient-alerts.component';
import { SocketIoModule, SocketIoConfig } from 'ngx-socket-io';
import { LogingComponent } from './components/loging/loging.component';
import { PatientInfoComponent } from './components/patient-info/patient-info.component';
import { MainNavComponent } from './main-nav/main-nav.component';
import { LayoutModule } from '@angular/cdk/layout';

import { NgxSpinnerModule } from 'ngx-spinner';

import { AlertModule } from "ngx-bootstrap";
import { JwtModule } from '@auth0/angular-jwt';
import { JwtAuthInterceptor } from './service/jwtIntersept';

const config: SocketIoConfig = { url: 'http://localhost:8988', options: {} };

@NgModule({
  declarations: [
    AppComponent,
    PatientGridComponent,
    ErrorBoxContainerComponent,
    PatientAlertsComponent,
    LogingComponent,
    PatientInfoComponent,
    Page404NotFoundComponent,
    MainNavComponent, AlertBlockComponent


  ],
  imports: [
    FormsModule,
    ReactiveFormsModule,
    BrowserModule,
    AppRoutingModule,
    MaterialModule,
    HttpClientModule,
    BrowserAnimationsModule,
    MatNativeDateModule,
    SocketIoModule.forRoot(config),
    AgmCoreModule.forRoot({
      apiKey: 'AIzaSyCOJEnZGUizUc5fQ5BzRDPifKxJuYPRgJA',
      libraries: ['places']
    }),
    LayoutModule,
    MatToolbarModule,
    MatButtonModule,
    MatSidenavModule,
    MatIconModule,
    MatListModule,
    NgxSpinnerModule,
    AlertModule,


  ],
  providers: [

    PatientsService,
    CommonService,
    FwkDocumentService,
    {
      provide: HTTP_INTERCEPTORS,
      useClass: JwtAuthInterceptor,
      multi: true
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
