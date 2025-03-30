import { CalendarComponent } from './calendar.component';

import { MockBuilder, MockRender } from 'ng-mocks';
import { NgControl } from '@angular/forms';
import { CalendarValueAccessorDirective } from '@shared/directives';

describe('CalendarComponent', () => {

  beforeEach(() => MockBuilder(CalendarComponent)
    .keep(CalendarValueAccessorDirective)
    .mock(NgControl));

  it('Should create', () => {
    const fixture = MockRender(CalendarComponent, {displayFormat: 'd MM yy', modelFormat: 'yyyy-MM-dd'});
    expect(fixture.point.componentInstance).toBeDefined();
  });
});
