import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UserDraftComponent } from './user-draft.component';

describe('UserDraftComponent', () => {
  let component: UserDraftComponent;
  let fixture: ComponentFixture<UserDraftComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ UserDraftComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(UserDraftComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
