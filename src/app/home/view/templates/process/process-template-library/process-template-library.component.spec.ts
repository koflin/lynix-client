import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { ProcessTemplateLibraryComponent } from './process-template-library.component';

describe('ProcessTemplateLibraryComponent', () => {
  let component: ProcessTemplateLibraryComponent;
  let fixture: ComponentFixture<ProcessTemplateLibraryComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ ProcessTemplateLibraryComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ProcessTemplateLibraryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
