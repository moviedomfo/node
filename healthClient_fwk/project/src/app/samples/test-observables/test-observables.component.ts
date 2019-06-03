import { Component, OnInit, ViewChild, ElementRef, AfterViewInit, EventEmitter, Output } from '@angular/core';
import { PatientsService } from 'src/app/service/patients.service';
import { PatientBE, ServiceError } from 'src/app/model';
import { Observable, fromEvent, Subscription, of, BehaviorSubject } from 'rxjs';
import { throttleTime, map, scan, debounceTime, distinctUntilChanged, tap, filter, startWith } from 'rxjs/operators';

@Component({
  selector: 'app-test-observables',
  templateUrl: './test-observables.component.html'
})
export class TestObservablesComponent implements AfterViewInit {
  @ViewChild('btn1') button: ElementRef;
  @ViewChild('input') input: ElementRef;
  private inputKeyList: string;
  private clickCount: string;
  
  @Output('onSearch')
  onSearch = new EventEmitter<string>();
  private subscription: Subscription;

  public strings: BehaviorSubject<string[]>;
  private countries: string[] = ['Afganistán', 'Argélia', 'Bahamas', 'Benin', 'Chile', 'China', 'Niue', 'Norway', 'Inglaterra'];
  private persons: Array<Object> = [
    { name: 'Joe', age: 31 },
    { name: 'Bob', age: 25 }
  ];

  public countriesObjects: Array<Object> = [
    { id: 1, text: 'Afganistán' },
    { id: 2, text: 'Argélia 2' },
    { id: 3, text: 'Bahamas 3' },
    { id: 4, text: 'China ' },
  ];


  constructor() { }
  ngAfterViewInit(): void {



    //---------------------------------------------------------------------------------------------------------------------
    const squareOf2 = of(1, 2, 3, 4, 5, 6)
      .pipe(
        filter(num => num % 2 === 0),
        map(num => num * num)
      );

    squareOf2.subscribe(num => console.log(num));
    //---------------------------------------------------------------------------------------------------------------------
    var countryList$ = of('Afganistán', 'Argélia', 'Bahamas', 'Benin', 'Chile', 'China', 'Niue', 'Norway', 'Inglaterra').pipe(
      filter(item => item.startsWith('B')),
      map(item => item + ' : chk')
    );
    countryList$.subscribe((item) => console.log(item));
    //---------------------------------------------------------------------------------------------------------------------
    let index = 0
    var personObject$ = of(this.persons).pipe(
      //filter(item=> item.age === 31), 
      map(item => item)
    );
    personObject$.subscribe((item) => {
      var o = JSON.stringify(item);

      console.log(index + ' ' + o)
      index++;
    });


    //---------------------------------------------------------------------------------------------------------------------

    // var keyups = Observable.fromEvent(this.input.nativeElement as any, 'keyup')
    // .map( e  => {
    //     return e.target.value; // <-- target does not exist on {}
    // })

    const inputKeyUp$ = fromEvent(this.input.nativeElement, 'keyup')
      .pipe(
        debounceTime(150),
        distinctUntilChanged(),
        map(e => {
          //console.log(e);
          //console.log(this.input.nativeElement.value);
          this.inputKeyList=this.input.nativeElement.value;
        }),
        tap(el => { //e can now trigger a page load by passing the query string, the page size and page index to the the Data Source via the tap() operator.

          console.log("tap " );
        })
      );


      inputKeyUp$.subscribe(() =>{
            //this.inputKeyList=this.input.nativeElement.value; No hace falta poner codigo aqui eneste caso: el operador map realiza la tarea de establecer la variable
      });

    // // // // const inputKeyUp$ = fromEvent<any>(this.input.nativeElement, 'keyup')
    // // // //   .pipe(
    // // // //     map(event => event.target.value),
    // // // //     startWith(''),
    // // // //     debounceTime(400),
    // // // //     distinctUntilChanged()
    // // // //   );
      
    // // // // this.subscription = inputKeyUp$
    // // // //   .subscribe(
    // // // //     criterion => {
    // // // //       this.onSearch.emit(criterion);
    // // // //     }
    // // // //   );
  
    const btnClickEvent$ = fromEvent(this.button.nativeElement, 'click')
      .pipe(
        throttleTime(1000),
        map(event =>
          console.log(event)
        )

        //scan((pos, clientX) =>      pos= "pepe", 0)
      );

      btnClickEvent$.subscribe(

        (value) => {
          //this.clickCount =  valu;
           //this.clickCount =  this.button.nativeElement.pageX + ' Y = ' + this.button.nativeElement.y;
          //  console.log( event)
        }
      );


  }
  ngOnInit() {
  }




}
