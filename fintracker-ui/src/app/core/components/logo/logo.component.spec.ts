import { LogoComponent } from './logo.component';

import { MockBuilder, MockRender } from 'ng-mocks';

describe('LogoComponent', () => {

  beforeEach(() => MockBuilder(LogoComponent));

  it('Should create', () => {
    const fixture = MockRender(LogoComponent);
    expect(fixture.componentInstance).toBeDefined();
  });
});

