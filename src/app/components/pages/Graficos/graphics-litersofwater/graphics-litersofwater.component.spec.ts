import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GraphicsLitersofwaterComponent } from './graphics-litersofwater.component';

describe('GraphicsLitersofwaterComponent', () => {
  let component: GraphicsLitersofwaterComponent;
  let fixture: ComponentFixture<GraphicsLitersofwaterComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ GraphicsLitersofwaterComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(GraphicsLitersofwaterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
