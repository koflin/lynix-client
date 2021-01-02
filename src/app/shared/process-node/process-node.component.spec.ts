import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ProcessNodeComponent } from './process-node.component';

describe('ProcessNodeComponent', () => {
  let component: ProcessNodeComponent;
  let fixture: ComponentFixture<ProcessNodeComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ProcessNodeComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ProcessNodeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
