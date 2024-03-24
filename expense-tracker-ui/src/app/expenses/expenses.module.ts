import { NgModule } from '@angular/core';
import { SharedModule } from '@shared/shared.module';
import { ButtonModule } from 'primeng/button';
import { ExpensesRoutingModule } from './expenses-routing.module';
import { AddPurchaseView, EditPurchaseView, PurchasesView } from 'src/app/expenses/views';
import { DashboardView } from './views';
import { AgGridModule } from 'ag-grid-angular';
import { RippleModule } from 'primeng/ripple';
import { ProductsInputTableComponent, PurchaseFormComponent, PurchasesTableComponent } from 'src/app/expenses/components';
import { CardModule } from 'primeng/card';
import { AutoCompleteModule } from 'primeng/autocomplete';
import { InputTextModule } from 'primeng/inputtext';
import { CalendarModule } from 'primeng/calendar';
import { ReactiveFormsModule } from '@angular/forms';
import { NgxSvgSpriteFragment } from 'ngxtension/svg-sprite';
import { SvgAssetComponent } from '@shared/components/svg-asset/svg-asset.component';
import { DynamicDialogModule } from 'primeng/dynamicdialog';
import { TagModule } from 'primeng/tag';
import { CalendarComponent } from '@shared/components/calendar/calendar.component';

@NgModule({
  declarations: [
    PurchasesView,
    DashboardView,
    PurchasesTableComponent,
    AddPurchaseView,
    ProductsInputTableComponent,
    PurchaseFormComponent,
    EditPurchaseView
  ],
  imports: [
    ExpensesRoutingModule,
    SharedModule,
    ButtonModule,
    AgGridModule,
    RippleModule,
    CardModule,
    AutoCompleteModule,
    InputTextModule,
    CalendarModule,
    ReactiveFormsModule,
    NgxSvgSpriteFragment,
    SvgAssetComponent,
    DynamicDialogModule,
    TagModule,
    CalendarComponent
  ],
  schemas: []
})
export class ExpensesModule {
}
