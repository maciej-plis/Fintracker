import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddShopDialog } from './add-shop.dialog';

describe('ShopFormComponent', () => {
  let component: AddShopDialog;
  let fixture: ComponentFixture<AddShopDialog>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AddShopDialog]
    })
      .compileComponents();

    fixture = TestBed.createComponent(AddShopDialog);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
