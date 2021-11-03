import { TestBed } from '@angular/core/testing';

import { KartDetailsService } from './kart-details.service';

describe('KartDetailsService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: KartDetailsService = TestBed.get(KartDetailsService);
    expect(service).toBeTruthy();
  });
});
