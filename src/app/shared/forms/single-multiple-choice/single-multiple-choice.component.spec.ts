import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SingleMultipleChoiceComponent } from './single-multiple-choice.component';

describe('SingleMultipleChoiceComponent', () => {
  let component: SingleMultipleChoiceComponent;
  let fixture: ComponentFixture<SingleMultipleChoiceComponent>;

  beforeEach(async(() => {
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
