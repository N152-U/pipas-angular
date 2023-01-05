import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditPiperoComponent } from './edit-pipero.component';

describe('EditPiperoComponent', () => {
  let component: EditPiperoComponent;
  let fixture: ComponentFixture<EditPiperoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EditPiperoComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(EditPiperoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
