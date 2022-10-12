import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import * as feather from "feather-icons";
import {
  PurchasesDisplayTableComponent
} from '../../components/purchases-display-table/purchases-display-table.component';
import { MatDialog } from "@angular/material/dialog";
import { ConfirmationDialog } from "@shared/components/confirmation-dialog/confirmation-dialog.component";
import { PurchasesService } from 'build/expense-tracker-frontend-api';
import { filter } from "rxjs";

@Component({
  selector: 'app-purchases',
  templateUrl: './purchases.component.html',
  styleUrls: ['./purchases.component.scss']
})
export class PurchasesComponent implements OnInit, AfterViewInit {

  @ViewChild("displayTable") table: PurchasesDisplayTableComponent;

  constructor(private dialog: MatDialog, private purchasesService: PurchasesService) {}

  ngOnInit(): void {
  }

  ngAfterViewInit() {
    feather.replace();
  }

  onDelete() {
    if (this.table.selection.isEmpty()) return;

    this.dialog
      .open(ConfirmationDialog, {
        data: {
          confirmationTitle: "Title",
          confirmationDescription: "Description",
          confirmBtnText: "Yes",
          rejectBtnText: "No"
        }
      })
      .afterClosed()
      .pipe(filter(approved => approved))
      .subscribe(approved => this.deletePurchases(approved));
  }

  private deletePurchases(approved: boolean) {
    // const purchaseIds = this.table.selection.selected.map(purchase => purchase.id);
    // this.purchasesService.deletePurchases(purchaseIds);
    this.table.loadPurchasesPage();
  }
}
