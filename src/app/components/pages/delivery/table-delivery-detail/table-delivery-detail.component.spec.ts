import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TableDeliveryDetailComponent } from './table-delivery-detail.component';

describe('TableDeliveryDetailComponent', () => {
  let component: TableDeliveryDetailComponent;
  let fixture: ComponentFixture<TableDeliveryDetailComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TableDeliveryDetailComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TableDeliveryDetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
