import { Directive, forwardRef } from '@angular/core';
import { NG_VALUE_ACCESSOR } from '@angular/forms';
import { ValueAccessorDirective } from '@shared/directives';

@Directive({
  standalone: true,
  selector: '[appCalendarValueAccessor]',
  providers: [{
    provide: NG_VALUE_ACCESSOR,
    useExisting: forwardRef(() => CalendarValueAccessorDirector),
    multi: true
  }]
})
class CalendarValueAccessorDirector extends ValueAccessorDirective<any> {

  public override writeValue(value: string | null): void {
    const dateValue = value ? new Date(value) : value;
    this.value.set(dateValue);
  }
}
