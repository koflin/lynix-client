import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ToolLibraryComponent } from './tool-library.component';

describe('ToolLibraryComponent', () => {
  let component: ToolLibraryComponent;
  let fixture: ComponentFixture<ToolLibraryComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ToolLibraryComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ToolLibraryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
