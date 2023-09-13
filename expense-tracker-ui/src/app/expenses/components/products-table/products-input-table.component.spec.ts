import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProductsInputTableComponent } from './products-input-table.component';

describe('ProductsTableComponent', () => {
  let component: ProductsInputTableComponent;
  let fixture: ComponentFixture<ProductsInputTableComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ProductsInputTableComponent]
    });
    fixture = TestBed.createComponent(ProductsInputTableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
