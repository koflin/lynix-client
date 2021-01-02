import { TestBed } from '@angular/core/testing';

import { ProductTempaltesService } from './product-tempaltes.service';

describe('ProductTempaltesService', () => {
  let service: ProductTempaltesService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ProductTempaltesService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
