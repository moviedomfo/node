import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { GoogleSearchComponent } from './google-search.component';

describe('GoogleSearchComponent', () => {
  let component: GoogleSearchComponent;
  let fixture: ComponentFixture<GoogleSearchComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ GoogleSearchComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(GoogleSearchComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
