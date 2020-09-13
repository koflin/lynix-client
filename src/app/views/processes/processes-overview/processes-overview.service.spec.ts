import { TestBed } from '@angular/core/testing';

import { ProcessesOverviewService } from './processes-overview.service';

describe('ProcessesOverviewService', () => {
  let service: ProcessesOverviewService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ProcessesOverviewService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
