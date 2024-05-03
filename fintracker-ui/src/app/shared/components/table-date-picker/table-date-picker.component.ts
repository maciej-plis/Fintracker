import { ChangeDetectionStrategy, Component } from '@angular/core';
import { IDateParams } from 'ag-grid-community';
import { IDateAngularComp } from 'ag-grid-angular';
import { FormsModule } from '@angular/forms';
import { CalendarModule } from 'primeng/calendar';
import { AutoFocusModule } from 'primeng/autofocus';

@Component({
  standalone: true,
  selector: 'app-table-date-picker',
  templateUrl: './table-date-picker.component.html',
  styleUrls: ['./table-date-picker.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [
    CalendarModule,
    FormsModule,
    AutoFocusModule
  ]
})
export class TableDatePickerComponent implements IDateAngularComp {

  protected params: IDateParams;
  protected date: Date | null;

  public agInit(params: IDateParams): void {
    this.params = params;
  }

  public getDate(): Date | null {
    return this.date;
  }

  public setDate(date: Date | null): void {
    this.date = date;
  }

  protected onSelect() {
    this.params.onDateChanged();
  }

  protected onClearClick() {
    this.params.onDateChanged();
  }

  protected onInput() {
    this.params.onDateChanged();
  }
}
