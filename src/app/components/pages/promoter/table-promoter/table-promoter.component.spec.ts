import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TablePromoterComponent } from './table-promoter.component';

describe('TablePromoterComponent', () => {
  let component: TablePromoterComponent;
  let fixture: ComponentFixture<TablePromoterComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TablePromoterComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TablePromoterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
