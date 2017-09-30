import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PatientMangerComponent } from './patient-manger.component';

describe('PatientMangerComponent', () => {
  let component: PatientMangerComponent;
  let fixture: ComponentFixture<PatientMangerComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PatientMangerComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PatientMangerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
