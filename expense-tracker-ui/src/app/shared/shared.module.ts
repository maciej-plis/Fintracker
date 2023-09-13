import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ErrorMessagesConverterPipe } from './pipes';
import { NoFocusDirective } from './directives/no-focus/no-focus.directive';
import { TableComponent } from './components/table/table.component';
import { AgGridModule } from 'ag-grid-angular';
import { ButtonModule } from 'primeng/button';
import { ButtonCellRendererComponent } from './components/button-cell-renderer/button-cell-renderer.component';
import { TextFilterComponent } from './components/text-filter/text-filter.component';
import { TableDatePickerComponent } from './components/table-date-picker/table-date-picker.component';
import { CalendarModule } from 'primeng/calendar';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AutoFocusModule } from 'primeng/autofocus';
import { ActionCellEditor } from './components/button-cell-editor/action-cell-editor.component';
import { AutoCompleteModule } from 'primeng/autocomplete';


@NgModule({
  declarations: [
    ErrorMessagesConverterPipe,
    NoFocusDirective,
    TableComponent,
    ButtonCellRendererComponent,
    TextFilterComponent,
    TableDatePickerComponent,
    ActionCellEditor
  ],
  imports: [
    CommonModule,
    AgGridModule,
    ButtonModule,
    CalendarModule,
    FormsModule,
    AutoFocusModule,
    AutoCompleteModule,
    ReactiveFormsModule
  ],
  exports: [
    ErrorMessagesConverterPipe,
    CommonModule,
    NoFocusDirective,
    TableComponent
  ]
})
export class SharedModule {
}
