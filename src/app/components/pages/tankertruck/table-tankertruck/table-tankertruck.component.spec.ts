import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TableTankertruckComponent } from './table-tankertruck.component';

describe('TableTankertruckComponent', () => {
  let component: TableTankertruckComponent;
  let fixture: ComponentFixture<TableTankertruckComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TableTankertruckComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TableTankertruckComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
