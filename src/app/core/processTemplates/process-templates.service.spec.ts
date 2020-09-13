import { TestBed } from '@angular/core/testing';

import { ProcessTemplatesService } from './process-templates.service';

describe('ProcessTemplatesService', () => {
  let service: ProcessTemplatesService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ProcessTemplatesService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
