import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FilesUserComponent } from './files-user.component';

describe('FilesUserComponent', () => {
  let component: FilesUserComponent;
  let fixture: ComponentFixture<FilesUserComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [FilesUserComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FilesUserComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
