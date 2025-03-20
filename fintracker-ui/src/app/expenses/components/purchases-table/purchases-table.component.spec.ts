import { PurchasesTableComponent } from './purchases-table.component';

import { MockBuilder, MockRender } from 'ng-mocks';
import { PurchaseSummariesApi, ShopsApi } from '@core/api';

describe('PurchasesTableComponent', () => {

  beforeEach(() => MockBuilder(PurchasesTableComponent)
    .mock(PurchaseSummariesApi)
    .mock(ShopsApi));

  it('Should create', () => {
    const fixture = MockRender(PurchasesTableComponent);
    expect(fixture.componentInstance).toBeDefined();
  });
});
