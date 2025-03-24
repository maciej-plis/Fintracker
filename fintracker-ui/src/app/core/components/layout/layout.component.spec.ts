import { LayoutComponent } from './layout.component';

import { MockBuilder, MockRender } from 'ng-mocks';

describe('LayoutComponent', () => {

  beforeEach(() => MockBuilder(LayoutComponent));

  it('Should create', () => {
    const fixture = MockRender(LayoutComponent);
    expect(fixture.componentInstance).toBeDefined();
  });
});
