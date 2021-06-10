import { TestBed } from '@angular/core/testing';

import { SeedimCartExtService } from './seedim-cart-ext.service';

describe('SeedimCartExtService', () => {
  let service: SeedimCartExtService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(SeedimCartExtService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
