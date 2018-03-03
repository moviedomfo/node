import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { LoginDataComponent } from './login-data.component';

describe('LoginDataComponent', () => {
  let component: LoginDataComponent;
  let fixture: ComponentFixture<LoginDataComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ LoginDataComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LoginDataComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
