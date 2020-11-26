import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ToolDraftComponent } from './tool-draft.component';

describe('ToolDraftComponent', () => {
  let component: ToolDraftComponent;
  let fixture: ComponentFixture<ToolDraftComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ToolDraftComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ToolDraftComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
