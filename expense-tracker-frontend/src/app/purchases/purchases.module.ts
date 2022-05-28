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
import { ApiModule } from 'build/expense-tracker-frontend-api';
import { registerAllModules } from "handsontable/registry";
import { plPL, registerLanguageDictionary } from "handsontable/i18n";

@NgModule({
  declarations: [
    PurchasesInputTable,
    AddPurchaseShopDialog,
    AddPurchaseCategoryDialog,
    PurchasesConfirmationDialog,
    AddPurchasesComponent,
    PurchasesComponent
  ],
  imports: [
    PurchasesRoutingModule,
    SharedModule,
    ApiModule,
    HotTableModule,
    LayoutModule,
    FormsModule,
    ReactiveFormsModule
  ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class PurchasesModule {

  constructor() {
    registerAllModules();
    registerLanguageDictionary(plPL);
  }
}
