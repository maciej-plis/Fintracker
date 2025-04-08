import { ChangeDetectionStrategy, Component, effect, model, signal, viewChild } from '@angular/core';
import { IDateParams } from 'ag-grid-community';
import { IDateAngularComp } from 'ag-grid-angular';
import { FormsModule } from '@angular/forms';
import { AutoFocus, AutoFocusModule } from 'primeng/autofocus';
import { DatePicker } from 'primeng/datepicker';
import { DateInputDirective } from '@shared/directives/date-input/date-input.directive';
import { IAfterGuiAttachedParams } from 'ag-grid-enterprise';

@Component({
  selector: 'app-table-date-picker',
  templateUrl: './table-date-picker.component.html',
  styleUrl: './table-date-picker.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [
    FormsModule,
    AutoFocusModule,
    DatePicker,
    DateInputDirective
  ]
})
export class TableDatePickerComponent implements IDateAngularComp {

  private static readonly EMPTY_CALLBACK: OnDateChangedCallback = () => void 0;

  protected readonly onDateChanged = signal<OnDateChangedCallback>(TableDatePickerComponent.EMPTY_CALLBACK);
  protected readonly date = model<Date | null>(null);

  private readonly calendarFocus = viewChild.required(AutoFocus);

  constructor() {
    effect(() => this.date() && 0 || this.onDateChanged());
  }

  public agInit(params: IDateParams): void {
    this.updateState(params);
  }

  public afterGuiAttached(params: IAfterGuiAttachedParams): void {
    this.calendarFocus().autoFocus();
  }

  public getDate(): Date | null {
    return this.date();
  }

  public setDate(date: Date | null): void {
    this.date.set(date);
  }

  private updateState(params: IDateParams): void {
    this.onDateChanged.set(params.onDateChanged);
  }
}

export type OnDateChangedCallback = () => void;
