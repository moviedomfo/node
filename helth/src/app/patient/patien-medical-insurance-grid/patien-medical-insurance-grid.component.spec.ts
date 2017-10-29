import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PatienMedicalInsuranceGridComponent } from './patien-medical-insurance-grid.component';

describe('PatienMedicalInsuranceGridComponent', () => {
  let component: PatienMedicalInsuranceGridComponent;
  let fixture: ComponentFixture<PatienMedicalInsuranceGridComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PatienMedicalInsuranceGridComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PatienMedicalInsuranceGridComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
