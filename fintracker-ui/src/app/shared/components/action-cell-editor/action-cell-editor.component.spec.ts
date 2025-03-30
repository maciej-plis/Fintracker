import { ActionCellEditor } from './action-cell-editor.component';

import { MockBuilder, MockRender } from 'ng-mocks';

describe('ActionCellEditor', () => {

  beforeEach(() => MockBuilder(ActionCellEditor));

  it('Should create', () => {
    const fixture = MockRender(ActionCellEditor);
    expect(fixture.point.componentInstance).toBeDefined();
  });
});
