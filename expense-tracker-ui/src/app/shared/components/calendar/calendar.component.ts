import { Component, Directive, forwardRef, inject, input } from '@angular/core';
import { CalendarModule } from 'primeng/calendar';
import { PaginatorModule } from 'primeng/paginator';
import { NG_VALUE_ACCESSOR, ReactiveFormsModule } from '@angular/forms';
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
    if (!value) return;
    this.value.set(new Date(value));
  }
}

@Component({
  standalone: true,
  selector: 'app-calendar',
  templateUrl: './calendar.component.html',
  styleUrl: './calendar.component.scss',
  hostDirectives: [CalendarValueAccessorDirector],
  host: {
    '[class.p-inputwrapper-focus]': 'focused',
    '[class.p-inputwrapper-filled]': 'valueAccessor.value()'
  },
  imports: [
    CalendarModule,
    PaginatorModule,
    ReactiveFormsModule
  ]
})
export class CalendarComponent {

  public readonly displayFormat = input.required<string>();
  public readonly modelFormat = input.required<string>();

  protected readonly valueAccessor = inject(CalendarValueAccessorDirector);

  protected focused: boolean = false;

  protected onDisplayValueChange(value: Date) {
    this.valueAccessor.onChange(formatDate(value, this.modelFormat(), locale));
  }

  protected onFocus() {
    this.focused = true;
  }

  protected onBlur() {
    this.focused = false;
    this.valueAccessor.onTouched();
  }
}
