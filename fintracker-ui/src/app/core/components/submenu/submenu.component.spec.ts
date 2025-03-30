import { SubmenuComponent } from './submenu.component';

import { MockBuilder, MockRender } from 'ng-mocks';

describe('SubmenuComponent', () => {

  beforeEach(() => MockBuilder(SubmenuComponent));

  it('Should create', () => {
    const fixture = MockRender(SubmenuComponent);
    expect(fixture.point.componentInstance).toBeDefined();
  });
});
