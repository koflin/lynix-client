import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { StepGuideTabComponent } from './step-guide-tab.component';

describe('StepGuideTabComponent', () => {
  let component: StepGuideTabComponent;
  let fixture: ComponentFixture<StepGuideTabComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ StepGuideTabComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(StepGuideTabComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
