import {CollectionViewer, DataSource} from "@angular/cdk/collections";
import { IPerson, PatientBE } from 'src/app/model';
import { BehaviorSubject, Observable, of, Subscription } from 'rxjs';

import { PatientsService } from 'src/app/service/patients.service';
import { catchError, finalize } from 'rxjs/operators';

//https://blog.angular-university.io/angular-material-data-table/
export class PatientsCardDataSource implements DataSource<PatientBE> {
    private _length = 100000;
    private _pageSize = 100;
    private _fetchedPages = new Set<number>();
    private itemsSubject = new BehaviorSubject<PatientBE[]>([]);
    private loadingSubject = new BehaviorSubject<boolean>(false);
    public loading$ = this.loadingSubject.asObservable();

    private _cachedData = Array.from<PatientBE>({length: this._length});
    private _subscription = new Subscription();
    
    constructor(private patientsService: PatientsService) {
        this.loadItems(null,null,null);

    }

    connect(collectionViewer: CollectionViewer): Observable<PatientBE[]> {
        return this.itemsSubject.asObservable();
        this._subscription.add(collectionViewer.viewChange.subscribe(range => {
            const startPage = this._getPageForIndex(range.start);
            const endPage = this._getPageForIndex(range.end - 1);
            for (let i = startPage; i <= endPage; i++) {
              this._fetchPage(i,range[i]);
            }
          }));
          return this.itemsSubject;
    }

    disconnect(collectionViewer: CollectionViewer): void {
        this.itemsSubject.complete();
        this.loadingSubject.complete();
    }
  
   public loadItems(filter: string,  pageIndex: number, pageSize: number) {
                    this.loadingSubject.next(true);

                    this.patientsService.retrivePatients$( filter, pageIndex, pageSize).pipe(
                        catchError(() => of([])),
                        finalize(() => this.loadingSubject.next(false))
                    )
                    .subscribe(items => this.itemsSubject.next(items));
    }  

    private _getPageForIndex(index: number): number {
        return Math.floor(index / this._pageSize);
      }

      private _fetchPage(page: number, patient: PatientBE) {
        if (this._fetchedPages.has(page)) {
          return;
        }
        this._fetchedPages.add(page);
    
        // Use `setTimeout` to simulate fetching data from server.
        setTimeout(() => {
          this._cachedData.splice(page * this._pageSize, this._pageSize,
              ...Array.from({length: this._pageSize})
                  .map((_, i) => patient));

          this.itemsSubject.next(this._cachedData);
        }, Math.random() * 1000 + 200);
      }
}