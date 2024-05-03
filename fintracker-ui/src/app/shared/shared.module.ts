import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ErrorMessagesConverterPipe } from './pipes';
import { NoFocusDirective } from '@shared/directives';
import { TableComponent, TextFilterComponent } from '@shared/components';
import { AgGridModule } from 'ag-grid-angular';
import { ButtonModule } from 'primeng/button';
import { CalendarModule } from 'primeng/calendar';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AutoFocusModule } from 'primeng/autofocus';
import { AutoCompleteModule } from 'primeng/autocomplete';


@NgModule({
  declarations: [
    ErrorMessagesConverterPipe,
    NoFocusDirective,
    TableComponent,
    TextFilterComponent
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
