import { TestBed } from '@angular/core/testing';

import { GuideGuard } from './guide.guard';

describe('GuideGuard', () => {
  let guard: GuideGuard;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    guard = TestBed.inject(GuideGuard);
  });

  it('should be created', () => {
    expect(guard).toBeTruthy();
  });
});
