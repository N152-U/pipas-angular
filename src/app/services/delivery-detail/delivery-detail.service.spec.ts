import { TestBed } from '@angular/core/testing';

import { DeliveryDetailService } from './delivery-detail.service';

describe('DeliveryDetailService', () => {
  let service: DeliveryDetailService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(DeliveryDetailService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
