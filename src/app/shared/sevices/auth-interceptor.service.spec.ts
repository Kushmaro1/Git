import { TestBed, inject } from '@angular/core/testing';

import { AuthInterceptor } from './auth-interceptor.service';
import { RouterTestingModule } from '@angular/router/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';

describe('AuthInterceptor', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [AuthInterceptor],
      imports:[RouterTestingModule.withRoutes([]),HttpClientTestingModule]
    });
  });

  it('should be created', inject([AuthInterceptor], (service: AuthInterceptor) => {
    expect(service).toBeTruthy();
  }));
});
