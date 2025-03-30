import { PurchasesTableComponent } from '@expenses/components';

import { MockBuilder, MockRender } from 'ng-mocks';
import { PurchasesTableService } from '@expenses/services';

describe('PurchasesTableComponent', () => {

  beforeEach(() => MockBuilder(PurchasesTableComponent)
    .mock(PurchasesTableService)
  );

  it('Should create', () => {
    const fixture = MockRender(PurchasesTableComponent);
    expect(fixture.point.componentInstance).toBeDefined();
  });
});
