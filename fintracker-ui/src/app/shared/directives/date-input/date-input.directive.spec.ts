import { DateInputDirective } from './date-input.directive';
import { MockBuilder, MockRender } from 'ng-mocks';
import { DatePicker } from 'primeng/datepicker';

describe('DateInputDirective', () => {

  beforeEach(() => MockBuilder(DateInputDirective)
    .mock(DatePicker)
  );

  it('Should be created', () => {
    const directive = MockRender('<p-datepicker appDateInput>');
    expect(directive.componentInstance).toBeDefined();
  });
});
