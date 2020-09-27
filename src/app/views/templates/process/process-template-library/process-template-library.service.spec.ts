import { TestBed } from '@angular/core/testing';

import { ProcessTemplateLibraryService } from './process-template-library.service';

describe('ProcessTemplateLibraryService', () => {
  let service: ProcessTemplateLibraryService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ProcessTemplateLibraryService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
