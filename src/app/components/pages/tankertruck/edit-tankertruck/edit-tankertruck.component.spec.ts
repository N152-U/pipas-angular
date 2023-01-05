import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditTankertruckComponent } from './edit-tankertruck.component';

describe('EditTankertruckComponent', () => {
  let component: EditTankertruckComponent;
  let fixture: ComponentFixture<EditTankertruckComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EditTankertruckComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(EditTankertruckComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
