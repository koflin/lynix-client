import { TestBed } from '@angular/core/testing';

import { ProductTemplateLibraryService } from './product-template-library.service';

describe('ProductTemplateLibraryService', () => {
  let service: ProductTemplateLibraryService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ProductTemplateLibraryService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
