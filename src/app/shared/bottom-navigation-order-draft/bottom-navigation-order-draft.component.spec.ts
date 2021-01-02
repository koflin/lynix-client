import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BottomNavigationOrderDraftComponent } from './bottom-navigation-order-draft.component';

describe('BottomNavigationOrderDraftComponent', () => {
  let component: BottomNavigationOrderDraftComponent;
  let fixture: ComponentFixture<BottomNavigationOrderDraftComponent>;

  beforeEach(async(() => {
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
