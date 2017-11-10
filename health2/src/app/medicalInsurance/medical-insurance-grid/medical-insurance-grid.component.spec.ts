import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MedicalInsuranceGridComponent } from './medical-insurance-grid.component';

describe('MedicalInsuranceGridComponent', () => {
  let component: MedicalInsuranceGridComponent;
  let fixture: ComponentFixture<MedicalInsuranceGridComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MedicalInsuranceGridComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MedicalInsuranceGridComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
