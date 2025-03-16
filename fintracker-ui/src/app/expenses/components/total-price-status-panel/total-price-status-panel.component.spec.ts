import { TotalPriceStatusPanel } from 'src/app/expenses/components/total-price-status-panel/total-price-status-panel.component';
import { MockBuilder, MockRender } from 'ng-mocks';

describe('TotalPriceStatusPanel', () => {

  beforeEach(() => MockBuilder(TotalPriceStatusPanel));

  it('Should create', () => {
    const fixture = MockRender(TotalPriceStatusPanel);
    expect(fixture.componentInstance).toBeTruthy();
  });
});
