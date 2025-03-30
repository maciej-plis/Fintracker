import { MockBuilder, MockRender } from 'ng-mocks';
import { PurchasesView } from 'src/app/expenses/views/purchases/purchases.view';

describe('PurchasesView', () => {

  beforeEach(() => MockBuilder(PurchasesView));

  it('Should create', () => {
    const fixture = MockRender(PurchasesView);
    expect(fixture.point.componentInstance).toBeDefined();
  });
});
