import { AutoCompleteCellEditor } from './auto-complete-cell-editor.component';

import { MockBuilder, MockRender } from 'ng-mocks';
import { FormsModule } from '@angular/forms';
import { AutoComplete } from 'primeng/autocomplete';

describe('AutoCompleteCellEditor', () => {

  beforeEach(() => MockBuilder(AutoCompleteCellEditor)
    .keep(FormsModule)
    .keep(AutoComplete)
  );

  it('Should create', () => {
    const fixture = MockRender(AutoCompleteCellEditor);
    expect(fixture.point.componentInstance).toBeDefined();
  });
});
