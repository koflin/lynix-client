import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ChartBarStakedComponent } from './chart-bar-staked.component';

describe('ChartBarStakedComponent', () => {
  let component: ChartBarStakedComponent;
  let fixture: ComponentFixture<ChartBarStakedComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ChartBarStakedComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ChartBarStakedComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
