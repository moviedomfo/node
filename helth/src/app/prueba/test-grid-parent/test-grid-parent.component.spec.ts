import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TestGridParentComponent } from './test-grid-parent.component';

describe('TestGridParentComponent', () => {
  let component: TestGridParentComponent;
  let fixture: ComponentFixture<TestGridParentComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TestGridParentComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TestGridParentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
