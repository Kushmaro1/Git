import { TestBed } from '@angular/core/testing';

import { DatePickerService } from './date-picker.service';

describe('DatePickerService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: DatePickerService = TestBed.get(DatePickerService);
    expect(service).toBeTruthy();
  });
});
