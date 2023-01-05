import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SavePromoterComponent } from './save-promoter.component';

describe('SavePromoterComponent', () => {
  let component: SavePromoterComponent;
  let fixture: ComponentFixture<SavePromoterComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SavePromoterComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SavePromoterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
