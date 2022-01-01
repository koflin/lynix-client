import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CheckboxSelectComponent } from './checkbox-select.component';

describe('CheckboxSelectComponent', () => {
  let component: CheckboxSelectComponent;
  let fixture: ComponentFixture<CheckboxSelectComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CheckboxSelectComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CheckboxSelectComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
