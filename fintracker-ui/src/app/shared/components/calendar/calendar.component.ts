import { ChangeDetectionStrategy, Component, Directive, forwardRef, inject, input } from '@angular/core';
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
    const dateValue = value ? new Date(value) : value;
    this.value.set(dateValue);
  }
}

@Component({
  standalone: true,
  selector: 'app-calendar',
  templateUrl: './calendar.component.html',
  styleUrl: './calendar.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
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
    const dateStr = value ? formatDate(value, this.modelFormat(), locale) : value;
    this.valueAccessor.valueChanged(dateStr);
  }

  protected onFocus() {
    this.focused = true;
  }

  protected onBlur() {
    this.focused = false;
    this.valueAccessor.onTouched();
  }
}
