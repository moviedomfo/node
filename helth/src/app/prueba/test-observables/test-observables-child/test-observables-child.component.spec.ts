import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TestObservablesChildComponent } from './test-observables-child.component';

describe('TestObservablesChildComponent', () => {
  let component: TestObservablesChildComponent;
  let fixture: ComponentFixture<TestObservablesChildComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TestObservablesChildComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TestObservablesChildComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
