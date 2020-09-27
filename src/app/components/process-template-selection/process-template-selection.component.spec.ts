import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProcessTemplateSelectionComponent } from './process-template-selection.component';

describe('ProcessTemplateSelectionComponent', () => {
  let component: ProcessTemplateSelectionComponent;
  let fixture: ComponentFixture<ProcessTemplateSelectionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ProcessTemplateSelectionComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ProcessTemplateSelectionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
