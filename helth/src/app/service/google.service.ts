import { Injectable } from '@angular/core';
import { GooglePlaceComponent } from './google-place.component';
import { Observable } from 'rxjs/Observable';

declare var google: any;

@Injectable()
export class GoogleService {      
  search(term: string) {
    return new Observable<GooglePlaceComponent[]>(observer => {
      let result: GooglePlaceComponent[] = [];
      let displaySuggestions = function(predictions: any, status: string) {
        if (status != google.maps.places.PlacesServiceStatus.OK) {
          alert(status);
          return;
        }
        predictions.forEach(function(prediction: any) {
          result.push(new GooglePlaceComponent(prediction.place_id, prediction.description));
        });
        observer.next(result);
        observer.complete();
      };
      if (term) {
        let service = new google.maps.places.AutocompleteService();
        service.getQueryPredictions({ input: term }, displaySuggestions);
      }
    });
  }
}