import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProductTemplateSelectionComponent } from './product-template-selection.component';

describe('ProductTemplateSelectionComponent', () => {
  let component: ProductTemplateSelectionComponent;
  let fixture: ComponentFixture<ProductTemplateSelectionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ProductTemplateSelectionComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ProductTemplateSelectionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
