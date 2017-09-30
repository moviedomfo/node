import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ModelDialogComponent } from './modal-dialog.component';

describe('ModelDialogComponent', () => {
  let component: ModelDialogComponent;
  let fixture: ComponentFixture<ModelDialogComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ModelDialogComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ModelDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
