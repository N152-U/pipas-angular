import { TestBed } from '@angular/core/testing';

import { PiperoService } from './pipero.service';

describe('PiperoService', () => {
  let service: PiperoService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(PiperoService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
