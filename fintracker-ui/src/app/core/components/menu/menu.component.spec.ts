import { MenuComponent } from './menu.component';

import { MockBuilder, MockRender } from 'ng-mocks';

describe('MenuComponent', () => {

  beforeEach(() => MockBuilder(MenuComponent));

  it('Should create', () => {
    const fixture = MockRender(MenuComponent, { menuItems: [] });
    expect(fixture.point.componentInstance).toBeDefined();
  });
});
