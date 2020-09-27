import { ComponentFixture, TestBed } from '@angular/core/testing';

import { StepTemplateTabComponent } from './step-template-tab.component';

describe('StepTemplateTabComponent', () => {
  let component: StepTemplateTabComponent;
  let fixture: ComponentFixture<StepTemplateTabComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ StepTemplateTabComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(StepTemplateTabComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
