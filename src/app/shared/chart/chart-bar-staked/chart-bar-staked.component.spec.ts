import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { ChartBarStakedComponent } from './chart-bar-staked.component';

describe('ChartBarStakedComponent', () => {
  let component: ChartBarStakedComponent;
  let fixture: ComponentFixture<ChartBarStakedComponent>;

  beforeEach(waitForAsync(() => {
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
