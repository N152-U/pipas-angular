import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SavePiperoComponent } from './save-pipero.component';

describe('SavePiperoComponent', () => {
  let component: SavePiperoComponent;
  let fixture: ComponentFixture<SavePiperoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SavePiperoComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SavePiperoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
