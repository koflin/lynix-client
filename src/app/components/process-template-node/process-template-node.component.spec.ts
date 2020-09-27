import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProcessTemplateNodeComponent } from './process-template-node.component';

describe('ProcessTemplateNodeComponent', () => {
  let component: ProcessTemplateNodeComponent;
  let fixture: ComponentFixture<ProcessTemplateNodeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ProcessTemplateNodeComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ProcessTemplateNodeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
