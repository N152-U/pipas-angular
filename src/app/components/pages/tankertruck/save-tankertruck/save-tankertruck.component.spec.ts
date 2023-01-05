import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SaveTankertruckComponent } from './save-tankertruck.component';

describe('SaveTankertruckComponent', () => {
  let component: SaveTankertruckComponent;
  let fixture: ComponentFixture<SaveTankertruckComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SaveTankertruckComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SaveTankertruckComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
