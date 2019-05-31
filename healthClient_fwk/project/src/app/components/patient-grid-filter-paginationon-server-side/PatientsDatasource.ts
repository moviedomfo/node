import { CollectionViewer, DataSource } from "@angular/cdk/collections";
import { PatientBE } from 'src/app/model';
import { BehaviorSubject, Observable, of } from 'rxjs';

import { PatientsService } from 'src/app/service/patients.service';
import { catchError, finalize } from 'rxjs/operators';

//https://blog.angular-university.io/angular-material-data-table/
export class PatientsDataSource implements DataSource<PatientBE> {

    private itemsSubject = new BehaviorSubject<PatientBE[]>([]);
    //used by spinner-container 
    private loadingSubject = new BehaviorSubject<boolean>(false);
    public loading$ = this.loadingSubject.asObservable();
    
    constructor(private patientsService: PatientsService) { }

    connect(collectionViewer: CollectionViewer): Observable<PatientBE[]> {
        return this.itemsSubject.asObservable();
    }

    disconnect(collectionViewer: CollectionViewer): void {
        this.itemsSubject.complete();
        this.loadingSubject.complete();
    }

    public loadItems(filter: string, pageIndex: number, pageSize: number) {

        this.loadingSubject.next(true);

        this.patientsService.retrivePatients$(filter, pageIndex, pageSize).pipe(
            catchError(() => of([])),
            finalize(() => this.loadingSubject.next(false))
        )
            .subscribe(items => this.itemsSubject.next(items));
    }


}