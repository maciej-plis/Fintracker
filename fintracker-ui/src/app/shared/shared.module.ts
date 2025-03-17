import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TableComponent, TextFilterComponent } from '@shared/components';
import { AgGridModule } from 'ag-grid-angular';
import { ButtonModule } from 'primeng/button';
import { CalendarModule } from 'primeng/calendar';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AutoFocusModule } from 'primeng/autofocus';
import { AutoCompleteModule } from 'primeng/autocomplete';


@NgModule({
  declarations: [
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
    CommonModule,
    TableComponent
  ]
})
export class SharedModule {
}
