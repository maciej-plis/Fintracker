import { SidebarComponent } from './sidebar.component';

import { MockBuilder, MockRender } from 'ng-mocks';
import { LayoutService } from '@core/services';

describe('SidebarComponent', () => {

  beforeEach(() => MockBuilder(SidebarComponent)
    .keep(LayoutService)
  );

  it('Should create', () => {
    const fixture = MockRender('<div app-sidebar></div>');
    expect(fixture.point.componentInstance).toBeDefined();
  });
});
