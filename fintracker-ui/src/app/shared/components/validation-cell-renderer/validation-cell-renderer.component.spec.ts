import { ValidationCellRenderer } from './validation-cell-renderer.component';

import { MockBuilder, MockRender } from 'ng-mocks';

describe('ValidationCellRenderer', () => {

  beforeEach(() => MockBuilder(ValidationCellRenderer));

  it('Should create', () => {
    const fixture = MockRender(ValidationCellRenderer);
    expect(fixture.componentInstance).toBeDefined();
  });
});
