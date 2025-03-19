import { Component, inject, input, signal } from '@angular/core';
import { CalendarModule } from 'primeng/calendar';
import { PaginatorModule } from 'primeng/paginator';
import { NgControl, ReactiveFormsModule } from '@angular/forms';
import { formatDate } from '@angular/common';
import { locale } from 'src/app/app.constants';
import { CalendarValueAccessorDirective } from '@shared/directives';

@Component({
  standalone: true,
  selector: 'app-calendar',
  templateUrl: './calendar.component.html',
  styleUrl: './calendar.component.scss',
  hostDirectives: [CalendarValueAccessorDirective],
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
  protected readonly valueAccessor = inject(CalendarValueAccessorDirective);

  public readonly displayFormat = input.required<string>();
  public readonly modelFormat = input.required<string>();

  protected readonly focused = signal(false);

  protected onDisplayValueChange(value: Date) {
    const dateStr = value ? formatDate(value, this.modelFormat(), locale) : null;
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
