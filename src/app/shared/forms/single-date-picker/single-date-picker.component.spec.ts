import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SingleDatePickerComponent } from './single-date-picker.component';

describe('SingleDatePickerComponent', () => {
  let component: SingleDatePickerComponent;
  let fixture: ComponentFixture<SingleDatePickerComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SingleDatePickerComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SingleDatePickerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
