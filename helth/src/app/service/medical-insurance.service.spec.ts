import { TestBed, inject } from '@angular/core/testing';

import { MedicalInsuranceService } from './medical-insurance.service';

describe('MedicalInsuranceService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [MedicalInsuranceService]
    });
  });

  it('should be created', inject([MedicalInsuranceService], (service: MedicalInsuranceService) => {
    expect(service).toBeTruthy();
  }));
});
