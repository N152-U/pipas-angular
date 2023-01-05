import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DriverVehicleTableComponent } from './driver-vehicle-table.component';

describe('DriverVehicleTableComponent', () => {
  let component: DriverVehicleTableComponent;
  let fixture: ComponentFixture<DriverVehicleTableComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DriverVehicleTableComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DriverVehicleTableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
