import { TestBed } from '@angular/core/testing';

import { TranslatorService } from './translator.service';
import { HttpClientTestingModule } from '@angular/common/http/testing';

describe('TranslatorService', () => {
  beforeEach(() => TestBed.configureTestingModule({
    imports:[HttpClientTestingModule]
  }));

  it('should be created', () => {
    const service: TranslatorService = TestBed.get(TranslatorService);
    expect(service).toBeTruthy();
  });
});
