import { Directive, inject, input, OnInit } from '@angular/core';
import { DatePicker } from 'primeng/datepicker';
import { formatDate } from '@angular/common';
import { locale } from 'src/app/app.constants';

@Directive({
  selector: 'p-datepicker[appDateInput]'
})
export class DateInputDirective implements OnInit {

  private readonly datePicker = inject(DatePicker);

  public readonly modelFormat = input<string>();

  constructor() {
    this.datePicker.showButtonBar = true;
    this.datePicker.firstDayOfWeek = 1;
  }

  ngOnInit(): void {
    const modelFormat = this.modelFormat();
    if (!modelFormat) return;

    const originalOnModelChange = this.datePicker.onModelChange;
    this.datePicker.registerOnChange((value?: Date) => originalOnModelChange(value ? formatDate(value, modelFormat, locale) : null));

    const originalWriteValue = this.datePicker.writeValue;
    this.datePicker.writeValue = (value?: string) => originalWriteValue.bind(this.datePicker)(value ? new Date(value) : null);
  }
}
