import { SidebarComponent } from './sidebar.component';

import { MockBuilder, MockRender } from 'ng-mocks';

describe('SidebarComponent', () => {

  beforeEach(() => MockBuilder(SidebarComponent));

  it('Should create', () => {
    const fixture = MockRender(SidebarComponent);
    expect(fixture.point.componentInstance).toBeDefined();
  });
});
