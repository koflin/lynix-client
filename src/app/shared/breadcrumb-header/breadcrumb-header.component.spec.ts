import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { BreadcrumbHeaderComponent } from './breadcrumb-header.component';

describe('BreadcrumbHeaderComponent', () => {
  let component: BreadcrumbHeaderComponent;
  let fixture: ComponentFixture<BreadcrumbHeaderComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ BreadcrumbHeaderComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BreadcrumbHeaderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
