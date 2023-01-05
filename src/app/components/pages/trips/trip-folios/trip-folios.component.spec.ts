import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TripFoliosComponent } from './trip-folios.component';

describe('TripFoliosComponent', () => {
  let component: TripFoliosComponent;
  let fixture: ComponentFixture<TripFoliosComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TripFoliosComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TripFoliosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
