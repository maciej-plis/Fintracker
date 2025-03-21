import { ChangeDetectionStrategy, Component, signal } from '@angular/core';
import { IDateParams } from 'ag-grid-community';
import { IDateAngularComp } from 'ag-grid-angular';
import { FormsModule } from '@angular/forms';
import { CalendarModule } from 'primeng/calendar';
import { AutoFocusModule } from 'primeng/autofocus';

@Component({
  standalone: true,
  selector: 'app-table-date-picker',
  templateUrl: './table-date-picker.component.html',
  styleUrls: [ './table-date-picker.component.scss' ],
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [
    CalendarModule,
    FormsModule,
    AutoFocusModule
  ]
})
export class TableDatePickerComponent implements IDateAngularComp {

  private static readonly EMPTY_CALLBACK: OnDateChangedCallback = () => void 0;

  protected onDateChanged = signal<OnDateChangedCallback>(TableDatePickerComponent.EMPTY_CALLBACK);
  protected date = signal<Date | null>(null);

  public agInit(params: IDateParams): void {
    this.updateState(params);
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
