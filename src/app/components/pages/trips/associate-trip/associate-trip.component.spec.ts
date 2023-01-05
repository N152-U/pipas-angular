import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AssociateTripComponent } from './associate-trip.component';

describe('AssociateTripComponent', () => {
  let component: AssociateTripComponent;
  let fixture: ComponentFixture<AssociateTripComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AssociateTripComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AssociateTripComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
