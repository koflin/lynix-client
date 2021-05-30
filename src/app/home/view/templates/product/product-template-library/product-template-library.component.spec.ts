import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { ProductTemplateLibraryComponent } from './product-template-library.component';

describe('ProductTemplateLibraryComponent', () => {
  let component: ProductTemplateLibraryComponent;
  let fixture: ComponentFixture<ProductTemplateLibraryComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ ProductTemplateLibraryComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ProductTemplateLibraryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
