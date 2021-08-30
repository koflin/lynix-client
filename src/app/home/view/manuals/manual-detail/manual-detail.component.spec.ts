import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ManualDetailComponent } from './manual-detail.component';

describe('ManualDetailComponent', () => {
  let component: ManualDetailComponent;
  let fixture: ComponentFixture<ManualDetailComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ManualDetailComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ManualDetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
