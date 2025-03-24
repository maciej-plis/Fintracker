import { MockBuilder, MockRender } from 'ng-mocks';
import { CalendarValueAccessorDirective } from '@shared/directives';

describe('CalendarValueAccessorDirective', () => {

  beforeEach(() => MockBuilder(CalendarValueAccessorDirective));

  it('Should be created', () => {
    const directive = MockRender('<input appCalendarValueAccessor>');
    expect(directive.componentInstance).toBeDefined();
  });
});
