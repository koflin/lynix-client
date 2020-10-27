import { TestBed } from '@angular/core/testing';

import { UsersDetailService } from './users-detail.service';

describe('UsersDetailService', () => {
  let service: UsersDetailService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(UsersDetailService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
