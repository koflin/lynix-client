import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { OrdersDraftComponent } from './orders-draft.component';

describe('OrdersDraftComponent', () => {
  let component: OrdersDraftComponent;
  let fixture: ComponentFixture<OrdersDraftComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ OrdersDraftComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(OrdersDraftComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
