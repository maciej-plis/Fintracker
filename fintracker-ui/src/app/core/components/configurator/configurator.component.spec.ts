import { ConfiguratorComponent } from './configurator.component';

import { MockBuilder, MockRender } from 'ng-mocks';

describe('ConfiguratorComponent', () => {

  beforeEach(() => MockBuilder(ConfiguratorComponent));

  it('Should create', () => {
    const fixture = MockRender(ConfiguratorComponent);
    expect(fixture.componentInstance).toBeDefined();
  });
});
