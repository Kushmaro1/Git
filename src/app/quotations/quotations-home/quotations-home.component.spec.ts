import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { QuotationsHomeComponent } from './quotations-home.component';

describe('QuotationsHomeComponent', () => {
  let component: QuotationsHomeComponent;
  let fixture: ComponentFixture<QuotationsHomeComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ QuotationsHomeComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(QuotationsHomeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
