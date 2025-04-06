import { AddPurchaseView } from 'src/app/expenses/views/add-purchase/add-purchase.view';
import { MockBuilder, MockRender } from 'ng-mocks';
import { AsyncPipe } from '@angular/common';
import { PurchasesApi } from '@core/api';
import { ConfirmationService, MessageService } from 'primeng/api';
import { PurchaseFormService } from '@expenses/services/purchase-form/purchase-form.service';
import { EMPTY } from 'rxjs';

describe('AddPurchaseView', () => {

  beforeEach(() => MockBuilder(AddPurchaseView)
    .keep(AsyncPipe)
    .mock(PurchasesApi)
    .mock(MessageService)
    .mock(ConfirmationService)
    .mock(PurchaseFormService, {
      submitted$: EMPTY
    })
  );

  it('Should create', () => {
    const fixture = MockRender(AddPurchaseView);
    expect(fixture.point.componentInstance).toBeDefined();
  });
});
