import { TestBed } from '@angular/core/testing';

import { UsersOverviewService } from './users-overview.service';

describe('UsersOverviewService', () => {
  let service: UsersOverviewService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(UsersOverviewService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
