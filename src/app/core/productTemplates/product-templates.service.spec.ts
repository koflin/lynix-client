import { TestBed } from '@angular/core/testing';

import { ProductTemplatesService } from './product-templates.service';

describe('ProductTemplatesService', () => {
  let service: ProductTemplatesService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ProductTemplatesService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
