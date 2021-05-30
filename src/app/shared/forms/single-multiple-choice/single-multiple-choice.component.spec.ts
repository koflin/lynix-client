import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { SingleMultipleChoiceComponent } from './single-multiple-choice.component';

describe('SingleMultipleChoiceComponent', () => {
  let component: SingleMultipleChoiceComponent;
  let fixture: ComponentFixture<SingleMultipleChoiceComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ SingleMultipleChoiceComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SingleMultipleChoiceComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
