import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditDeliveyDetailComponent } from './edit-delivey-detail.component';

describe('EditDeliveyDetailComponent', () => {
  let component: EditDeliveyDetailComponent;
  let fixture: ComponentFixture<EditDeliveyDetailComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EditDeliveyDetailComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(EditDeliveyDetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
