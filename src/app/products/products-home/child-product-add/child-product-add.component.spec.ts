import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ChildProductAddComponent } from './child-product-add.component';

describe('ChildProductAddComponent', () => {
  let component: ChildProductAddComponent;
  let fixture: ComponentFixture<ChildProductAddComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ChildProductAddComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ChildProductAddComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
