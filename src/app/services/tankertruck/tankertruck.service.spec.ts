import { TestBed } from '@angular/core/testing';

import { TankertruckService } from './tankertruck.service';

describe('TankertruckService', () => {
  let service: TankertruckService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(TankertruckService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
