import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ToolNodeComponent } from './tool-node.component';

describe('ToolNodeComponent', () => {
  let component: ToolNodeComponent;
  let fixture: ComponentFixture<ToolNodeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ToolNodeComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ToolNodeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
