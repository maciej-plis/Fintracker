import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditPurchaseView } from 'src/app/expenses/views/edit-purchase/edit-purchase.view';

describe('EditPurchaseComponent', () => {
  let component: EditPurchaseView;
  let fixture: ComponentFixture<EditPurchaseView>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [EditPurchaseView]
    });
    fixture = TestBed.createComponent(EditPurchaseView);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
