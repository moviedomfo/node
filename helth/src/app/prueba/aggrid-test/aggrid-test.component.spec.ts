import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AggridTestComponent } from './aggrid-test.component';

describe('AggridTestComponent', () => {
  let component: AggridTestComponent;
  let fixture: ComponentFixture<AggridTestComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AggridTestComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AggridTestComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
