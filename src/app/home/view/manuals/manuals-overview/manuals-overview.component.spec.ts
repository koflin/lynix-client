import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ManualsOverviewComponent } from './manuals-overview.component';

describe('ManualsOverviewComponent', () => {
  let component: ManualsOverviewComponent;
  let fixture: ComponentFixture<ManualsOverviewComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ManualsOverviewComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ManualsOverviewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
