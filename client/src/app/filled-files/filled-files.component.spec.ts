import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FilledFilesComponent } from './filled-files.component';

describe('FilledFilesComponent', () => {
  let component: FilledFilesComponent;
  let fixture: ComponentFixture<FilledFilesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [FilledFilesComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FilledFilesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
