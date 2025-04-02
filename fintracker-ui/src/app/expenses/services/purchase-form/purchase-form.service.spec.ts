import { PurchaseFormService } from './purchase-form.service';

import { MockBuilder, MockInstance, MockRender } from 'ng-mocks';

describe('PurchaseFormService', () => {

  MockInstance.scope();

  beforeEach(() => MockBuilder(PurchaseFormService));

  it('Should create', () => {
    const fixture = MockRender(PurchaseFormService);
    expect(fixture.point.componentInstance).toBeDefined();
  });
});
