import { TestBed, inject } from '@angular/core/testing';

import { HtmlHelpersService } from './html-helpers.service';

describe('HtmlHelpersService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [HtmlHelpersService]
    });
  });

  it('should be created', inject([HtmlHelpersService], (service: HtmlHelpersService) => {
    expect(service).toBeTruthy();
  }));
});
