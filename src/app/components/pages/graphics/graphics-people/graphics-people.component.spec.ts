import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GraphicsPeopleComponent } from './graphics-people.component';

describe('GraphicsPeopleComponent', () => {
  let component: GraphicsPeopleComponent;
  let fixture: ComponentFixture<GraphicsPeopleComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ GraphicsPeopleComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(GraphicsPeopleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
