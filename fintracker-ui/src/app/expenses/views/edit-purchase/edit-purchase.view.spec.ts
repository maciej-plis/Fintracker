import { EditPurchaseView } from 'src/app/expenses/views/edit-purchase/edit-purchase.view';

import { MockBuilder, MockRender } from 'ng-mocks';
import { ActivatedRoute } from '@angular/router';
import { PurchasesApi } from '@core/api';
import { ConfirmationService, MessageService } from 'primeng/api';
import { AsyncPipe } from '@angular/common';
import { of } from 'rxjs';

describe('EditPurchaseView', () => {

  const params = {purchaseId: '1'};

  beforeEach(() => MockBuilder(EditPurchaseView)
    .keep(AsyncPipe)
    .mock(PurchasesApi)
    .mock(MessageService)
    .mock(ConfirmationService)
    .provide({
      provide: ActivatedRoute,
      useValue: {
        snapshot: {params},
        params: of(params)
      }
    }));

  it('Should create', () => {
    const fixture = MockRender(EditPurchaseView);
    expect(fixture.point.componentInstance).toBeDefined();
  });
});

