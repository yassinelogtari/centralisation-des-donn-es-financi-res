import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditAccountUserComponent } from './edit-account-user.component';

describe('EditAccountUserComponent', () => {
  let component: EditAccountUserComponent;
  let fixture: ComponentFixture<EditAccountUserComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [EditAccountUserComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EditAccountUserComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
