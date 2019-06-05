

declare var google;
import { Component, ViewChild, EventEmitter, Output, OnInit, AfterViewInit, Input } from '@angular/core';

//import {} from '@types/googlemaps';

@Component({
  selector: 'app-autocomplete-google',
  templateUrl: './autocomplete-google.component.html',
  styleUrls: ['./autocomplete-google.component.css']
})



export class AutocompleteGoogleComponent implements OnInit, AfterViewInit {

  @Input() adressType: string;
  @Output() setAddress: EventEmitter<any> = new EventEmitter();
  @ViewChild('addresstext') addresstext: any;

  autocompleteInput: string;
  queryWait: boolean;
  constructor() { }

  ngAfterViewInit() {
    this.getPlaceAutocomplete();
  }

  ngOnInit(): void {

  }

  private getPlaceAutocomplete() {
    const autocomplete = new google.maps.places.Autocomplete(this.addresstext.nativeElement,
      {
        componentRestrictions: { country: 'US' },
        types: [this.adressType]  // 'establishment' / 'address' / 'geocode'
      });
    google.maps.event.addListener(autocomplete, 'place_changed', () => {
      const place = autocomplete.getPlace();
      this.invokeEvent(place);
    });
  }

  invokeEvent(place: Object) {
    this.setAddress.emit(place);
  }
}
