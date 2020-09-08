import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProcessesOverviewComponent } from './processes-overview.component';

describe('ProcessesOverviewComponent', () => {
  let component: ProcessesOverviewComponent;
  let fixture: ComponentFixture<ProcessesOverviewComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ProcessesOverviewComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ProcessesOverviewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
