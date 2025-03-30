import { TopbarComponent } from './topbar.component';

import { MockBuilder, MockRender } from 'ng-mocks';

describe('TopbarComponent', () => {

  beforeEach(() => MockBuilder(TopbarComponent));

  it('Should create', () => {
    const fixture = MockRender(TopbarComponent);
    expect(fixture.point.componentInstance).toBeDefined();
  });
});
