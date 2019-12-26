import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ProductsHomeComponent } from './products-home.component';

describe('ProductsHomeComponent', () => {
  let component: ProductsHomeComponent;
  let fixture: ComponentFixture<ProductsHomeComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ProductsHomeComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ProductsHomeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
