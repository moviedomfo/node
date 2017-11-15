import { Component, OnInit,Output,EventEmitter, Input } from '@angular/core';
//permmite cambiar la variable obsevada
import { Subject } from 'rxjs/Subject';
//permite observar
import { Observable } from 'rxjs/Observable';
import { MutualBE ,MutualPlanGridView} from '../../model/index';
import { PatientsService, CommonService, MedicalInsuranceService } from '../../service/index';
// rich grid and rich grid declarative
import { DateComponent } from "../../commonComponents/ag-grid/date.component";
import { HeaderComponent } from "../../commonComponents/ag-grid/header.component";
import { HeaderGroupComponent } from "../../commonComponents/ag-grid/header-group.component";
import { GridOptions } from "ag-grid/main";
import { RowNode } from 'ag-grid/dist/lib/entities/rowNode';
import { ServiceError } from '../../model/common.model';

@Component({
    selector: 'app-medical-insurance-grid',
    templateUrl: './medical-insurance-grid.component.html',
    styleUrls: ['./medical-insurance-grid.component.css']
})
export class MedicalInsuranceGridComponent implements OnInit {
    
    private columnDefs: any[];
    private gridOptions: GridOptions;
    @Output() onMedicalInsuranceChanged = new EventEmitter<MutualPlanGridView>();
    @Output() OnComponentError = new EventEmitter<ServiceError>();
    public currentMedicalInsurance:MutualPlanGridView;

    private mutualList: MutualBE[];
    private mutualPlanGridViewList : MutualPlanGridView[];
    private mutualList$: Observable<MutualBE[]>;

    constructor(private medicalInsuranceService: MedicalInsuranceService) { }

    ngOnInit() {
        // we pass an empty gridOptions in, so we can grab the api out
        this.gridOptions = <GridOptions>{};
        this.gridOptions.dateComponentFramework = DateComponent;
        this.gridOptions.defaultColDef = {
            headerComponentFramework: <{ new(): HeaderComponent }>HeaderComponent,
            headerComponentParams: {
                menuIcon: 'fa-bars'
            }
        }
        this.gridOptions.getContextMenuItems = this.getContextMenuItems.bind(this);
        this.gridOptions.floatingFilter = true;

        this.createColumnDefs();
        this.retriveAllObraSocial();
    }
    private getContextMenuItems(): any {
        let result: any = [
            { // custom item
                name: 'Alert ',
                action: function () {
                    window.alert('Alerting about ');
                },
                cssClasses: ['redFont', 'bold']
            }];
        return result;
    }
    private createColumnDefs() {
        this.columnDefs = [
            { headerName: "Mutual", field: "Nombre", width: 150, pinned: true, filter: 'text' },
            { headerName: "Plan", field: "ComercialCode", width: 150, pinned: true, filter: 'text' }
            
        ];
    }

    retriveAllObraSocial() {
       
        this.mutualList$ = this.medicalInsuranceService.retriveAllObraSocialService$("");
        this.mutualList$.subscribe(
            res => {
                
                this.mutualList = res;
                this.mutualPlanGridViewList=[];
                //Generamos mutualPlanGridViewList para bindearlo a la grilla
                this.mutualList.forEach(element => {
                    var mMutualPlanGridView : MutualPlanGridView;
                    if (element.MutualPlanList != null)
                    {
                        //recorro todos los planes
                        element.MutualPlanList.forEach(plan => {
                            mMutualPlanGridView = new MutualPlanGridView();
                            mMutualPlanGridView.MutualId = element.IdMutual;
                            mMutualPlanGridView.Nombre = element.Nombre;
                            mMutualPlanGridView.PlanId = plan.PlanId;
                            mMutualPlanGridView.ComercialCode = plan.ComercialCode;
                            this.mutualPlanGridViewList.push(mMutualPlanGridView);
                        });
                         
                    }//gen ero un solo plan
                    else{
                        mMutualPlanGridView = new MutualPlanGridView();
                        mMutualPlanGridView.MutualId = element.IdMutual;
                        mMutualPlanGridView.Nombre = element.Nombre;
                        this.mutualPlanGridViewList.push(mMutualPlanGridView);
                    }
                });
            },
            err=>{this.OnComponentError.emit(err); }
        );

    }
    onMedicalInsurance_rowDoubleClicked($event) {

    }
    onMedicalInsurance_cellClicked($event) {
        //console.log('onCellClicked: ' + $event.rowIndex + ' ' + $event.colDef.field);
        //document.querySelector('#selectedRows').innerHTML = $event;
        //item : RowNode;
        this.currentMedicalInsurance = $event.node.data;
        //alert(JSON.stringify(this.currentMutual)); 
        
        this.onMedicalInsuranceChanged.emit(this.currentMedicalInsurance);
        
    }

    //por el momento no se utiliza
    onMedicalInsurance_SelectionChanged() {
        var selectedRows = this.gridOptions.api.getSelectedRows();
        var selectedRowsString = '';
        selectedRows.forEach( function(selectedRow, index) {
            if (index!==0) {
                selectedRowsString += ', ';
            }
            selectedRowsString += selectedRow.Nombre;
        });
        document.querySelector('#selectedRows').innerHTML = selectedRowsString;
    }
}
