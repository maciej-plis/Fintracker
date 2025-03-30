import { BreadcrumbComponent } from '@core/components';

import { MockBuilder, MockRender } from 'ng-mocks';

describe('BreadcrumbComponent', () => {

  beforeEach(() => MockBuilder(BreadcrumbComponent));

  it('Should create', () => {
    const fixture = MockRender(BreadcrumbComponent);
    expect(fixture.point.componentInstance).toBeDefined();
  });
});
