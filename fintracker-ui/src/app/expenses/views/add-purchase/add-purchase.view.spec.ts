import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddPurchaseView } from 'src/app/expenses/views/add-purchase/add-purchase.view';

describe('AddPurchaseComponent', () => {
  let component: AddPurchaseView;
  let fixture: ComponentFixture<AddPurchaseView>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [AddPurchaseView]
    });
    fixture = TestBed.createComponent(AddPurchaseView);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
