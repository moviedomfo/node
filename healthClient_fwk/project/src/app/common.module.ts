import { NgModule } from '@angular/core'

import { PatientInfoComponent } from './components/patient-info/patient-info.component';
import { PatientGridTableComponent } from './components/patient-grid-table/patient-grid-table.component';
import { PatientGridTableModalComponent } from './components/patient-grid-table-modal/patient-grid-table-modal.component';
import { PatientAlertsComponent } from './components/patient-alerts/patient-alerts.component';
import { PatientGridComponent } from './components/patient-grid/patient-grid.component';
import { CommonService } from './service/common.service';
import { PatientsService } from './service/patients.service';
@NgModule({

    declarations:[ 
        
        PatientAlertsComponent,
        PatientGridComponent ,
        PatientInfoComponent,
        PatientGridTableComponent, 
        PatientGridTableModalComponent]
        ,
        providers: [PatientsService,CommonService],
})

export class CommonModule {}