import { Component, OnInit } from '@angular/core';


export class GooglePlaceComponent implements OnInit {

  constructor(public id: string,
    public description: string) { }

  ngOnInit() {
  }

}
