import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NgbdDatepickerBasic } from './datepicker-basic.component';

describe('DatepickerBasicComponent', () => {
  let component: NgbdDatepickerBasic;
  let fixture: ComponentFixture<NgbdDatepickerBasic>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ NgbdDatepickerBasic ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(NgbdDatepickerBasic);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
