import { TestBed } from '@angular/core/testing';

import { Footwear } from './footwear';

describe('Footwear', () => {
  let service: Footwear;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(Footwear);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
