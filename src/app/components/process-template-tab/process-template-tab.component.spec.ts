import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProcessTemplateTabComponent } from './process-template-tab.component';

describe('ProcessTemplateTabComponent', () => {
  let component: ProcessTemplateTabComponent;
  let fixture: ComponentFixture<ProcessTemplateTabComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ProcessTemplateTabComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ProcessTemplateTabComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
