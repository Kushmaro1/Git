import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ProductsAddParentComponent } from './products-add-parent.component';

describe('ProductsAddParentComponent', () => {
  let component: ProductsAddParentComponent;
  let fixture: ComponentFixture<ProductsAddParentComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ProductsAddParentComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ProductsAddParentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
