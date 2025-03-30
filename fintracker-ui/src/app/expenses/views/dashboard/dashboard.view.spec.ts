import { MockBuilder, MockRender } from 'ng-mocks';
import { DashboardView } from 'src/app/expenses/views/dashboard/dashboard.view';

describe('DashboardView', () => {

  beforeEach(() => MockBuilder(DashboardView));

  it('Should create', () => {
    const fixture = MockRender(DashboardView);
    expect(fixture.point.componentInstance).toBeDefined();
  });
});
