import { AfterViewInit, Component, ElementRef, ViewChild } from '@angular/core';
import { IDateParams } from 'ag-grid-community';
import { IDateAngularComp } from 'ag-grid-angular';

@Component({
  selector: 'app-table-date-picker',
  templateUrl: './table-date-picker.component.html',
  styleUrls: ['./table-date-picker.component.scss']
})
export class TableDatePickerComponent implements IDateAngularComp, AfterViewInit {

  @ViewChild('calendar', {read: ElementRef})
  public calendar: ElementRef;

  public params: IDateParams;
  public date: Date | null;

  public ngAfterViewInit(): void {
    window.setTimeout(() => this.calendar.nativeElement.querySelector('input').focus());
  }

  public agInit(params: IDateParams): void {
    this.params = params;
  }

  public onSelect() {
    this.params.onDateChanged();
  }

  public onClearClick() {
    this.params.onDateChanged();
  }

  public onInput() {
    this.params.onDateChanged();
  }

  public getDate(): Date | null {
    return this.date;
  }

  public setDate(date: Date | null): void {
    this.date = date;
  }
}
