import { Component, Input, OnInit } from '@angular/core';
import { AddPurchaseShopDialog } from "../add-purchase-shop-dialog/add-purchase-shop-dialog.component";
import { BehaviorSubject, filter } from "rxjs";
import { isNonNull } from "@shared/miscellaneous";
import { MatDialog } from "@angular/material/dialog";
import { ShopDto, ShopsService } from 'build/expense-tracker-frontend-api';
import { FormControl } from "@angular/forms";

@Component({
  selector: 'app-purchase-shop-input',
  templateUrl: './purchase-shop-input.component.html',
  styleUrls: ['./purchase-shop-input.component.scss']
})
export class PurchaseShopInputComponent implements OnInit {

  ADD_SHOP_TOKEN = "ADD_SHOP";

  @Input() shopFormControl: FormControl;

  shopsSubject: BehaviorSubject<ShopDto[]> = new BehaviorSubject<ShopDto[]>([]);

  constructor(
    private dialog: MatDialog,
    private shopsService: ShopsService
  ) { }

  ngOnInit(): void {
    this.shopsService.getPurchaseShops().subscribe(shops => this.shopsSubject.next(shops));
  }

  openAddShopDialog(): void {
    this.dialog
      .open(AddPurchaseShopDialog, {data: {name: ""}})
      .afterClosed()
      .pipe(filter(isNonNull))
      .subscribe(newShop => this.onNewShopAdded(newShop));
  }

  onNewShopAdded(newShop: ShopDto) {
    this.appendNewShopOption(newShop);
    this.setSelectedShop(newShop);
  }

  appendNewShopOption(shop: ShopDto): void {
    this.shopsSubject.next([...this.shopsSubject.value, shop])
  }

  setSelectedShop(shop: ShopDto): void {
    this.shopFormControl.patchValue(shop);
  }

  compareShops(shop1: ShopDto, shop2: ShopDto) {
    return shop1 && shop2 ? shop1.id === shop2.id : shop1 === shop2;
  }
}
