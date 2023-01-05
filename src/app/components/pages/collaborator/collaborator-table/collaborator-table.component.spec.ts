import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CollaboratorTableComponent } from './collaborator-table.component';

describe('CollaboratorTableComponent', () => {
  let component: CollaboratorTableComponent;
  let fixture: ComponentFixture<CollaboratorTableComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CollaboratorTableComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CollaboratorTableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
