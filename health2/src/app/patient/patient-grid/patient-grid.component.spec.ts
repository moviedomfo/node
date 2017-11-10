import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PatientGridComponent } from './patient-grid.component';

describe('PatientGridComponent', () => {
  let component: PatientGridComponent;
  let fixture: ComponentFixture<PatientGridComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PatientGridComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PatientGridComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
