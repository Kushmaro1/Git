import { TestBed, inject } from '@angular/core/testing';

import { LoginService } from './login.service';
import { HttpClientTestingModule } from '@angular/common/http/testing';

describe('LoginService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [LoginService],
      imports:[HttpClientTestingModule],
    });
  });

  it('should be created', inject([LoginService], (service: LoginService) => {
    expect(service).toBeTruthy();
  }));
});
