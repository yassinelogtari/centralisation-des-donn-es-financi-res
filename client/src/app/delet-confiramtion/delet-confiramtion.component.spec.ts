import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DeletConfiramtionComponent } from './delet-confiramtion.component';

describe('DeletConfiramtionComponent', () => {
  let component: DeletConfiramtionComponent;
  let fixture: ComponentFixture<DeletConfiramtionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [DeletConfiramtionComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DeletConfiramtionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
