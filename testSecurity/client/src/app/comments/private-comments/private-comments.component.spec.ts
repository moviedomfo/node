import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PrivateCommentsComponent } from './private-comments.component';

describe('PrivateCommentsComponent', () => {
  let component: PrivateCommentsComponent;
  let fixture: ComponentFixture<PrivateCommentsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PrivateCommentsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PrivateCommentsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
