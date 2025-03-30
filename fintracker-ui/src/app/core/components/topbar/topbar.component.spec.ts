import { TopbarComponent } from './topbar.component';

import { MockBuilder, MockRender } from 'ng-mocks';
import { LayoutService } from '@core/services';

describe('TopbarComponent', () => {

  beforeEach(() => MockBuilder(TopbarComponent)
    .keep(LayoutService)
  );

  it('Should create', () => {
    const fixture = MockRender('<div app-topbar></div>');
    expect(fixture.point.componentInstance).toBeDefined();
  });
});
