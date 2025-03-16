import { MockBuilder, MockRender } from 'ng-mocks';
import { TotalItemsStatusPanel } from 'src/app/expenses/components/total-items-status-panel/total-items-status-panel.component';

describe('TotalItemsStatusPanel', () => {

  beforeEach(() => MockBuilder(TotalItemsStatusPanel));

  it('Should create', () => {
    const fixture = MockRender(TotalItemsStatusPanel);
    expect(fixture.componentInstance).toBeTruthy();
  });
});
