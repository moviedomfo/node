import { ElementRef, NgZone,  ViewChild ,Component, OnInit ,Output, EventEmitter} from '@angular/core';
import { FormControl } from '@angular/forms';
//import { } from '@types/googlemaps';
import {} from '@agm/core/services/google-maps-types';
import { MapsAPILoader } from '@agm/core';
import { PlaceBE } from "../../model/persons.model";
declare var google: any
import {} from "googlemaps";

@Component({
  selector: 'app-google-place',
  templateUrl: './google-place.component.html',
  styleUrls: ['./google-place.component.css']
})

export class GooglePlaceComponent implements OnInit {

  public latitude: number;
  public longitude: number;
  public searchControl: FormControl;
  public zoom: number;
  public place:any;
  constructor(
    private mapsAPILoader: MapsAPILoader,
    private ngZone: NgZone
  ) {}

  @Output()  onPlaceChanged= new EventEmitter<PlaceBE>();
  @ViewChild("search",{ static: false })  public searchElementRef: ElementRef;
  ngOnInit() {
  
    //set google maps defaults
    this.zoom = 4;
    this.latitude = 39.8282;
    this.longitude = -98.5795;

    //create search FormControl
    this.searchControl = new FormControl();

    //set current position
    this.setCurrentPosition();

    //load Places Autocomplete
    this.mapsAPILoader.load().then(() => {
      
      let autocomplete = new google.maps.places.Autocomplete(this.searchElementRef.nativeElement, {
        types: ["address"]
      });
      autocomplete.addListener("place_changed", () => {
        this.ngZone.run(() => {
          //get the place result
          let place: google.maps.places.PlaceResult = autocomplete.getPlace();


          this.place= place;
          //verify result
          if (place.geometry === undefined || place.geometry === null) {
            return;
          }

          //set latitude, longitude and zoom
          this.latitude = place.geometry.location.lat();
          this.longitude = place.geometry.location.lng();
          this.zoom = 12;
          var placebe :PlaceBE= new PlaceBE();
          placebe.adr_address= this.place.adr_address;
          placebe.formatted_address= this.place.formatted_address;
          placebe.id= this.place.id;
          placebe.place_id= this.place.place_id;
          this.onPlaceChanged.emit(placebe);
        });
      });
    });
  }

  private setCurrentPosition() {
    if ("geolocation" in navigator) {
      navigator.geolocation.getCurrentPosition((position) => {
        this.latitude = position.coords.latitude;
        this.longitude = position.coords.longitude;
        this.zoom = 12;
      });
    }
  }

}
