import { Component, OnInit, ViewChild, ElementRef, AfterViewInit, EventEmitter, Output } from '@angular/core';
import { PatientsService } from 'src/app/service/patients.service';
import { PatientBE, ServiceError } from 'src/app/model';
import { Observable, fromEvent, Subscription } from 'rxjs';
import { PatientsCardDataSource } from './PatientsCardDatasource';
import { throttleTime, map, scan, debounceTime, distinctUntilChanged, tap, startWith } from 'rxjs/operators';


//https://www.youtube.com/watch?v=CRJxOA5FZZE

@Component({
  selector: 'app-patient-card-list',
  templateUrl: './patient-card-list.component.html',
  styleUrls: ['./patient-card-list.component.css']
})
export class PatientCardListComponent implements AfterViewInit {
  @ViewChild('btn1') button: ElementRef;
  @ViewChild('input') input: ElementRef;
  private globalError: ServiceError;
  private patientList: PatientBE[];
  private dataSource: PatientsCardDataSource;

  private count;

  @Output('onSearch')
  onSearch = new EventEmitter<string>();
  private subscription: Subscription;
  constructor(private patientsService: PatientsService, ) { }

  ngAfterViewInit(): void {

    // var keyups = Observable.fromEvent(this.input.nativeElement as any, 'keyup')
    // .map( e  => {
    //     return e.target.value; // <-- target does not exist on {}
    // })

    // fromEvent(this.input.nativeElement, 'keyup')
    //   .pipe(
    //     debounceTime(150),
    //     distinctUntilChanged(),
    //     map(e => {
    //       //console.log(e);
    //       console.log(this.input.nativeElement.value);
    //     }),
    //     tap(el => { //e can now trigger a page load by passing the query string, the page size and page index to the the Data Source via the tap() operator.

    //       console.log("tap " + el);
    //     })
    //   ).subscribe();


    const terms$ = fromEvent<any>(this.input.nativeElement, 'keyup')
      .pipe(
        map(event => event.target.value),
        startWith(''),
        debounceTime(400),
        distinctUntilChanged()
      );

    this.subscription = terms$
      .subscribe(
        criterion => {
          this.onSearch.emit(criterion);
        }
      );

    fromEvent(this.button.nativeElement, 'click')
      .pipe(
        throttleTime(1000),
        map(event => console.log(event))
        //scan((pos, clientX) =>      pos= "pepe", 0)
      )
      .subscribe(
        
        (event) => {
         var msg = 'X = ' +this.button.nativeElement.pageX + ' Y = ' + this.button.nativeElement.y;
      //  console.log( event)
      }
        );


  }

  ngOnInit() {
    this.patientList = [];

    //this.dataSource = new PatientsCardDataSource(this.patientsService);
    //this.retrivePatients() ;
  }

  retrivePatients() {
    let patientList$: Observable<PatientBE[]>;
    patientList$ = this.patientsService.retrivePatients$("", null, null);
    patientList$.subscribe((res: PatientBE[]) => {
      this.patientList = res;

    },
      err => {

        this.globalError = err;
      }
    );

  }
  ngOnDestroy() {
    this.subscription.unsubscribe();
  }
}
