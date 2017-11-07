import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AlertBlockComponent } from './alert-block.component';

describe('AlertBlockComponent', () => {
  let component: AlertBlockComponent;
  let fixture: ComponentFixture<AlertBlockComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AlertBlockComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AlertBlockComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
