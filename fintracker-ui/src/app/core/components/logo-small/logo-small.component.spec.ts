import { LogoSmallComponent } from './logo-small.component';

import { MockBuilder, MockRender } from 'ng-mocks';

describe('LogoSmallComponent', () => {

  beforeEach(() => MockBuilder(LogoSmallComponent));

  it('Should create', () => {
    const fixture = MockRender(LogoSmallComponent);
    expect(fixture.componentInstance).toBeDefined();
  });
});
