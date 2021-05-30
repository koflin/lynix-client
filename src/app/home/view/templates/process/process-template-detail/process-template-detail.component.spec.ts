import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { ProcessTemplateDetailComponent } from './process-template-detail.component';

describe('ProcessTemplateDetailComponent', () => {
  let component: ProcessTemplateDetailComponent;
  let fixture: ComponentFixture<ProcessTemplateDetailComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ ProcessTemplateDetailComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ProcessTemplateDetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
