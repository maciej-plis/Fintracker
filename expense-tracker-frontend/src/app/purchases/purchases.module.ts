import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';

import { PurchasesRoutingModule } from './purchases-routing.module';
import { SharedModule } from "@shared/shared.module";
import { AddPurchasesComponent, PurchasesComponent } from "./views";
import {
  AddPurchaseCategoryDialog,
  AddPurchaseShopDialog,
  PurchasesConfirmationDialog,
  PurchasesInputTable
} from "./components";
import { HotTableModule } from "@handsontable/angular";
import { LayoutModule } from "@angular/cdk/layout";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { registerAllModules } from "handsontable/registry";
import { plPL, registerLanguageDictionary } from "handsontable/i18n";
import { PurchasesDisplayTableComponent } from './components/purchases-display-table/purchases-display-table.component';
import { MatTableModule } from "@angular/material/table";
import { MatProgressSpinnerModule } from "@angular/material/progress-spinner";
import { MatPaginatorModule } from "@angular/material/paginator";
import { MatSortModule } from "@angular/material/sort";
import { MatCheckboxModule } from "@angular/material/checkbox";
import { MatButtonModule } from "@angular/material/button";
import { PurchaseShopInputComponent } from './components/purchase-shop-input/purchase-shop-input.component';
import { PurchaseDateInputComponent } from './components/purchase-date-input/purchase-date-input.component';
import { MAT_DATE_FORMATS } from "@angular/material/core";

export const MY_FORMATS = {
  parse: {
    dateInput: 'DD-MM-YYYY'
  },
  display: {
    dateInput: "DD-MM-YYYY",
    monthYearLabel: 'MMMM YYYY',
    dateA11yLabel: 'LL',
    monthYearA11yLabel: 'MMMM YYYY'
  }
}

@NgModule({
  declarations: [
    PurchasesInputTable,
    AddPurchaseShopDialog,
    AddPurchaseCategoryDialog,
    PurchasesConfirmationDialog,
    AddPurchasesComponent,
    PurchasesComponent,
    PurchasesDisplayTableComponent,
    PurchaseShopInputComponent,
    PurchaseDateInputComponent
  ],
  imports: [
    PurchasesRoutingModule,
    SharedModule,
    HotTableModule,
    LayoutModule,
    FormsModule,
    ReactiveFormsModule,
    MatTableModule,
    MatProgressSpinnerModule,
    MatPaginatorModule,
    MatSortModule,
    MatCheckboxModule,
    MatButtonModule
  ],
  providers: [
    {provide: MAT_DATE_FORMATS, useValue: MY_FORMATS}
  ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class PurchasesModule {

  constructor() {
    registerAllModules();
    registerLanguageDictionary(plPL);
  }
}
