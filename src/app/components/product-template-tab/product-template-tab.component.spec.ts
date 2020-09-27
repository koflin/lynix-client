import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProductTemplateTabComponent } from './product-template-tab.component';

describe('ProductTemplateTabComponent', () => {
  let component: ProductTemplateTabComponent;
  let fixture: ComponentFixture<ProductTemplateTabComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ProductTemplateTabComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ProductTemplateTabComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
