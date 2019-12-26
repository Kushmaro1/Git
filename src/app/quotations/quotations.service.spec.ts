import { TestBed } from '@angular/core/testing';

import { QuotationsService } from './quotations.service';

describe('QuotationsService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: QuotationsService = TestBed.get(QuotationsService);
    expect(service).toBeTruthy();
  });
});
