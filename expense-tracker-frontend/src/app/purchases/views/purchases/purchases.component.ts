import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import * as feather from "feather-icons";
import {
  PurchasesDisplayTableComponent
} from '../../components/purchases-display-table/purchases-display-table.component';
import { MatDialog } from "@angular/material/dialog";
import { ConfirmationDialog } from "@shared/components/confirmation-dialog/confirmation-dialog.component";
import { PurchaseDto, PurchasesService } from 'build/expense-tracker-frontend-api';
import { filter } from "rxjs";

@Component({
  selector: 'app-purchases',
  templateUrl: './purchases.component.html',
  styleUrls: ['./purchases.component.scss']
})
export class PurchasesComponent implements OnInit, AfterViewInit {

  @ViewChild("displayTable") table: PurchasesDisplayTableComponent;

  constructor(
    private dialog: MatDialog,
    private purchasesService: PurchasesService
  ) {}

  ngOnInit(): void {
  }

  ngAfterViewInit() {
    feather.replace();
  }

  deleteSelectedItems() {
    if (this.selectedPurchases.length === 0) return;

    this.dialog
      .open(ConfirmationDialog, {
        data: {
          confirmationTitle: "Confirm removing purchases",
          confirmationDescription: `Do you want to remove ${this.selectedPurchases.length} purchases?`,
          confirmBtnText: "Yes",
          rejectBtnText: "No"
        }
      })
      .afterClosed()
      .pipe(filter(confirmed => confirmed))
      .subscribe(() => this.deletePurchases());
  }

  get selectedPurchases(): PurchaseDto[] {
    return this.table.selection.selected;
  }

  private deletePurchases() {
    const ids = this.selectedPurchases.map(purchase => purchase.id);
    this.purchasesService.removePurchases({ids});
    this.table.loadPurchasesPage();
  }
}
