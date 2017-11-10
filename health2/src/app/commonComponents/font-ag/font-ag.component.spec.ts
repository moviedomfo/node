import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FontAgComponent } from './font-ag.component';

describe('FontAgComponent', () => {
  let component: FontAgComponent;
  let fixture: ComponentFixture<FontAgComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FontAgComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FontAgComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
