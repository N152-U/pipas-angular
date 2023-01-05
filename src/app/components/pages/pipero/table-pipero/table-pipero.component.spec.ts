import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TablePiperoComponent } from './table-pipero.component';

describe('TablePiperoComponent', () => {
  let component: TablePiperoComponent;
  let fixture: ComponentFixture<TablePiperoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TablePiperoComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TablePiperoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
