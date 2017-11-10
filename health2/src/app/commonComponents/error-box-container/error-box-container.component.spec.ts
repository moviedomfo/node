import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ErrorBoxContainerComponent } from './error-box-container.component';

describe('ErrorBoxContainerComponent', () => {
  let component: ErrorBoxContainerComponent;
  let fixture: ComponentFixture<ErrorBoxContainerComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ErrorBoxContainerComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ErrorBoxContainerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
