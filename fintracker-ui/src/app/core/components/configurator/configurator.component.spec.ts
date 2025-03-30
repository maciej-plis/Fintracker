import { ConfiguratorComponent } from './configurator.component';

import { MockBuilder, MockRender } from 'ng-mocks';
import { LayoutService } from '@core/services';
import { PrimeNG } from 'primeng/config';
import { Router } from '@angular/router';

describe('ConfiguratorComponent', () => {

  beforeEach(() => MockBuilder(ConfiguratorComponent)
    .keep(LayoutService)
    .mock(Router)
    .mock(PrimeNG)
  );

  it('Should create', () => {
    const fixture = MockRender(ConfiguratorComponent);
    expect(fixture.point.componentInstance).toBeDefined();
  });
});
