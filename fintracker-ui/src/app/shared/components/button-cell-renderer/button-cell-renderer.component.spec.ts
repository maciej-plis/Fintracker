import { ButtonCellRendererComponent } from './button-cell-renderer.component';

import { MockBuilder, MockRender } from 'ng-mocks';

describe('ButtonCellRendererComponent', () => {

  beforeEach(() => MockBuilder(ButtonCellRendererComponent));

  it('Should create', () => {
    const fixture = MockRender(ButtonCellRendererComponent);
    expect(fixture.point.componentInstance).toBeDefined();
  });
});
