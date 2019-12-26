import { TestBed, inject } from '@angular/core/testing';

import { SocketService } from './socket.service';
import { RouterTestingModule } from '@angular/router/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { EventBusService } from './event-bus.service';

describe('SocketService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [SocketService,EventBusService],
      imports:[RouterTestingModule.withRoutes([]),HttpClientTestingModule]
    });
  });

  it('should be created', inject([SocketService], (service: SocketService) => {
    expect(service).toBeTruthy();
  }));
});
