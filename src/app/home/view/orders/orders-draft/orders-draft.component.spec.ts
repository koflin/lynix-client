import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { OrdersDraftComponent } from './orders-draft.component';

describe('OrdersDraftComponent', () => {
  let component: OrdersDraftComponent;
  let fixture: ComponentFixture<OrdersDraftComponent>;

  beforeEach(async(() => {
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
