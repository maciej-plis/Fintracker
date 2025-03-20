import { AutoCompleteCellEditor } from './auto-complete-cell-editor.component';

import { MockBuilder, MockRender } from 'ng-mocks';

describe('AutoCompleteCellEditor', () => {

  beforeEach(() => MockBuilder(AutoCompleteCellEditor));

  it('Should create', () => {
    const fixture = MockRender(AutoCompleteCellEditor);
    expect(fixture.componentInstance).toBeDefined();
  });
});
