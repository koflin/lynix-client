import { TestBed } from '@angular/core/testing';

import { HasUnsavedDataGuard } from './has-unsaved-data.guard';

describe('HasUnsavedDataGuard', () => {
  let guard: HasUnsavedDataGuard;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    guard = TestBed.inject(HasUnsavedDataGuard);
  });

  it('should be created', () => {
    expect(guard).toBeTruthy();
  });
});
