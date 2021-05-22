import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { StatisticsOverviewComponent } from './statistics-overview.component';

describe('StatisticsOverviewComponent', () => {
  let component: StatisticsOverviewComponent;
  let fixture: ComponentFixture<StatisticsOverviewComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ StatisticsOverviewComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(StatisticsOverviewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
