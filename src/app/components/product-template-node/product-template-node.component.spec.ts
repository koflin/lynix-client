import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProductTemplateNodeComponent } from './product-template-node.component';

describe('ProductTemplateNodeComponent', () => {
  let component: ProductTemplateNodeComponent;
  let fixture: ComponentFixture<ProductTemplateNodeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ProductTemplateNodeComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ProductTemplateNodeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
