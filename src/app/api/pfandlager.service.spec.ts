import { TestBed } from '@angular/core/testing';

import { PfandlagerService } from './pfandlager.service';

describe('PfandlagerService', () => {
  let service: PfandlagerService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(PfandlagerService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
