import { Component, Directive, forwardRef, inject, input, signal } from '@angular/core';
import { CalendarModule } from 'primeng/calendar';
import { PaginatorModule } from 'primeng/paginator';
import { NG_VALUE_ACCESSOR, NgControl, ReactiveFormsModule } from '@angular/forms';
import { formatDate } from '@angular/common';
import { locale } from 'src/app/app.constants';
import { ValueAccessorDirective } from '@shared/directives/value-accessor/value-accessor.directive';

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

@Component({
  standalone: true,
  selector: 'app-calendar',
  templateUrl: './calendar.component.html',
  styleUrl: './calendar.component.scss',
  hostDirectives: [CalendarValueAccessorDirector],
  host: {
    '[class.p-inputwrapper-focus]': 'focused()',
    '[class.p-inputwrapper-filled]': 'valueAccessor.value()'
  },
  imports: [
    CalendarModule,
    PaginatorModule,
    ReactiveFormsModule
  ]
})
export class CalendarComponent {

  protected readonly ngControl = inject(NgControl, {self: true});
  protected readonly valueAccessor = inject(CalendarValueAccessorDirector);

  public readonly displayFormat = input.required<string>();
  public readonly modelFormat = input.required<string>();

  protected readonly focused = signal(false);

  protected onDisplayValueChange(value: Date) {
    const dateStr = value ? formatDate(value, this.modelFormat(), locale) : value;
    this.valueAccessor.valueChanged(dateStr);
  }

  protected onFocus() {
    this.focused.set(true);
  }

  protected onBlur() {
    this.focused.set(false);
    this.valueAccessor.onTouched();
  }
}
