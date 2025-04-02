import { ChangeDetectionStrategy, Component, inject, input, signal } from '@angular/core';
import { PaginatorModule } from 'primeng/paginator';
import { FormsModule } from '@angular/forms';
import { formatDate } from '@angular/common';
import { locale } from 'src/app/app.constants';
import { CalendarValueAccessorDirective } from '@shared/directives';
import { DatePicker } from 'primeng/datepicker';
import { ApplyHostClassesDirective } from '@shared/directives/apply-host-classes/apply-host-classes.directive';

@Component({
  selector: 'app-calendar',
  templateUrl: './calendar.component.html',
  styleUrl: './calendar.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
  hostDirectives: [ CalendarValueAccessorDirective ],
  host: {
    '[class.p-inputwrapper-focus]': 'focused()',
    '[class.p-inputwrapper-filled]': 'valueAccessor.value()'
  },
  imports: [
    PaginatorModule,
    FormsModule,
    DatePicker,
    ApplyHostClassesDirective
  ]
})
export class CalendarComponent {

  protected readonly valueAccessor = inject(CalendarValueAccessorDirective);

  public readonly inputId = input.required<string>();
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
