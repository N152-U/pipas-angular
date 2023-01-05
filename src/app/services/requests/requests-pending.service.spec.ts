import { TestBed } from '@angular/core/testing';

import { RequestsPendingService } from './requests-pending.service';

describe('RequestsPendingService', () => {
  let service: RequestsPendingService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(RequestsPendingService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
