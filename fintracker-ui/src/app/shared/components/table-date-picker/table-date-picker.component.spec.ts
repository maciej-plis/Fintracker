import { TableDatePickerComponent } from './table-date-picker.component';

import { MockBuilder, MockRender } from 'ng-mocks';

describe('TableDatePickerComponent', () => {

  beforeEach(() => MockBuilder(TableDatePickerComponent));

  it('Should create', () => {
    const fixture = MockRender(TableDatePickerComponent);
    expect(fixture.point.componentInstance).toBeDefined();
  });
});

