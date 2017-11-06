import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TestObservablesComponent } from './test-observables.component';

describe('TestObservablesComponent', () => {
  let component: TestObservablesComponent;
  let fixture: ComponentFixture<TestObservablesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TestObservablesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TestObservablesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
