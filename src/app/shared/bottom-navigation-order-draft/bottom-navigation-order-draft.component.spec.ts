import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { BottomNavigationOrderDraftComponent } from './bottom-navigation-order-draft.component';

describe('BottomNavigationOrderDraftComponent', () => {
  let component: BottomNavigationOrderDraftComponent;
  let fixture: ComponentFixture<BottomNavigationOrderDraftComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ BottomNavigationOrderDraftComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BottomNavigationOrderDraftComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
