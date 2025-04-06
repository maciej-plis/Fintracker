import { EditPurchaseView } from 'src/app/expenses/views/edit-purchase/edit-purchase.view';

import { MockBuilder, MockRender } from 'ng-mocks';
import { ActivatedRoute } from '@angular/router';
import { PurchasesApi } from '@core/api';
import { ConfirmationService, MessageService } from 'primeng/api';
import { AsyncPipe } from '@angular/common';
import { EMPTY, of } from 'rxjs';
import { PurchaseFormService } from '@expenses/services/purchase-form/purchase-form.service';
import createSpy = jasmine.createSpy;

describe('EditPurchaseView', () => {

  const params = { purchaseId: '1' };

  beforeEach(() => MockBuilder(EditPurchaseView)
    .keep(AsyncPipe)
    .mock(PurchasesApi, {
      getPurchase: createSpy().and.returnValue(EMPTY)
    })
    .mock(MessageService)
    .mock(ConfirmationService)
    .provide({
      provide: ActivatedRoute,
      useValue: {
        snapshot: { params },
        params: of(params)
      }
    })
    .mock(PurchaseFormService, {
      submitted$: EMPTY
    })
  );

  it('Should create', () => {
    const fixture = MockRender(EditPurchaseView);
    expect(fixture.point.componentInstance).toBeDefined();
  });
});

