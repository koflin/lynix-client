import { TestBed } from '@angular/core/testing';

import { OrdersOverviewService } from './orders-overview.service';

describe('OrdersOverviewService', () => {
  let service: OrdersOverviewService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(OrdersOverviewService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
