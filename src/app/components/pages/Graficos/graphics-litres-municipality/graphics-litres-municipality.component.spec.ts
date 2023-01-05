import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GraphicsLitresMunicipalityComponent } from './graphics-litres-municipality.component';

describe('GraphicsLitresMunicipalityComponent', () => {
  let component: GraphicsLitresMunicipalityComponent;
  let fixture: ComponentFixture<GraphicsLitresMunicipalityComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ GraphicsLitresMunicipalityComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(GraphicsLitresMunicipalityComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
