import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PersonGridComponent } from './person-grid.component';

describe('PersonGridComponent', () => {
  let component: PersonGridComponent;
  let fixture: ComponentFixture<PersonGridComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PersonGridComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PersonGridComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
