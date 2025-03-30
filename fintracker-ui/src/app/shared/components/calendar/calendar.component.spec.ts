import { CalendarComponent } from './calendar.component';

import { MockBuilder, MockRender } from 'ng-mocks';
import { FormsModule, NgControl } from '@angular/forms';
import { CalendarValueAccessorDirective } from '@shared/directives';
import { signal } from '@angular/core';

describe('CalendarComponent', () => {

  beforeEach(() => MockBuilder(CalendarComponent)
    .keep(CalendarValueAccessorDirective)
    .keep(FormsModule)
    .mock(NgControl));

  it('Should create', () => {
    const fixture = MockRender(CalendarComponent, {
        inputId: signal('id'),
        displayFormat: signal('d MM yy'),
        modelFormat: signal('yyyy-MM-dd')
      })
    ;
    expect(fixture.point.componentInstance).toBeDefined();
  });
});
