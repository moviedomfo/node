import { Component } from '@angular/core';
import { FormControl } from '@angular/forms';
import { GoogleService } from    './../service/index';
import { GooglePlaceComponent } from './../service/google-place.component';
import { Observable } from 'rxjs/Observable';
@Component({
  selector: 'google-search',
  template: `
    <div>
      <h2>Google Search</h2>
      <input type="text" [formControl]="term">
      <ul>
        <li *ngFor="let item of items | async">{{item.description}}</li>
      </ul>
    </div>  
  `
})
export class GoogleSearchComponent {

  items: Observable<Array<GooglePlaceComponent>>;
  term = new FormControl();

  constructor(private googleService: GoogleService) {}

  ngOnInit() {
    this.items = this.term.valueChanges
                 .debounceTime(400)
                 .distinctUntilChanged()
                 .switchMap(term => this.googleService.search(term));
  }
}