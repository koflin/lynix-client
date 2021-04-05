import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ProductTemplateDetailComponent } from './product-template-detail.component';

describe('ProductTemplateDetailComponent', () => {
  let component: ProductTemplateDetailComponent;
  let fixture: ComponentFixture<ProductTemplateDetailComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ProductTemplateDetailComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ProductTemplateDetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
