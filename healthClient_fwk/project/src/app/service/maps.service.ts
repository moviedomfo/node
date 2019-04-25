import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

interface Location{
  latitude:string;
  longitude:string;
}

@Injectable({
  providedIn: 'root'
})
export class MapsService {

  constructor(private http:HttpClient ) {

   }

   getLocation(){

    return this.http.get<Location>('https://api.ipapi.com/check?access_key=AIzaSyAEBn6XjDRlouhZP-nQHSU4equHUeR2wEc');
   }
}
