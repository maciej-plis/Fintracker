import { AfterViewInit, Component, forwardRef, HostBinding, HostListener, OnInit } from '@angular/core';
import { HotTableRegisterer } from "@handsontable/angular";
import { CategoriesService, CategoryDto, ProductsService, PurchasesService } from 'build/expense-tracker-frontend-api';
import Handsontable from "handsontable";
import { MatDialog } from "@angular/material/dialog";
import { AddPurchaseCategoryDialog } from "../add-purchase-category-dialog/add-purchase-category-dialog.component";
import { filter, Observable } from "rxjs";
import { isAnyPropertyNonNull, isNonNull } from "@shared/miscellaneous/functions";
import { CellChange } from "handsontable/common";
import { tap } from "rxjs/operators";
import {
  AbstractControl,
  ControlValueAccessor,
  FormArray,
  FormBuilder,
  FormGroup,
  NG_VALIDATORS,
  NG_VALUE_ACCESSOR,
  ValidationErrors,
  Validator
} from "@angular/forms";

enum Columns {
  CATEGORY = "category",
  NAME = "name",
  AMOUNT = "amount",
  PRICE = "price",
  DESCRIPTION = "description",
}

export const PURCHASES_HOT_VALUE_ACCESSOR: any = {
  provide: NG_VALUE_ACCESSOR,
  useExisting: forwardRef(() => PurchasesInputTable),
  multi: true
}

export const PURCHASES_HOT_VALUE_VALIDATOR: any = {
  provide: NG_VALIDATORS,
  useExisting: forwardRef(() => PurchasesInputTable),
  multi: true
}

@Component({
  selector: 'app-purchases-input-table',
  templateUrl: './purchases-input-table.component.html',
  styleUrls: ['./purchases-input-table.component.scss'],
  providers: [PURCHASES_HOT_VALUE_ACCESSOR, PURCHASES_HOT_VALUE_VALIDATOR],
  host: {
    '(blur)': '_onTouch()'
  }
})
export class PurchasesInputTable implements OnInit, AfterViewInit, ControlValueAccessor, Validator {

  private COLUMNS: Columns[] = Object.values(Columns)
  private REQUIRED_COLUMNS: string[] = [Columns.CATEGORY, Columns.NAME, Columns.AMOUNT, Columns.PRICE];
  private INITIAL_ROWS: number = 10
  private ADD_CATEGORY_OPTION: string = "Add Category"

  productsFormArray: FormArray<FormGroup>;

  private hot: Handsontable;

  public _onChange: Function;
  public _onTouch: Function;

  categories: CategoryDto[] = []

  hotSettings: Handsontable.GridSettings = {
    language: 'pl-PL',
    contextMenu: true,
    stretchH: 'all',
    minSpareRows: 1,
    rowHeights: 35,
    columnHeaderHeight: 35,
    className: 'htMiddle',
    colHeaders: true,
    licenseKey: 'non-commercial-and-evaluation',
    beforeChange: changes => this.beforeChange(changes),
    afterChange: changes => changes && this.afterChange(changes),
    afterRemoveRow: (index, amount) => this.afterRemoveRow(index, amount),
    afterCreateRow: (index, amount) => this.afterCreateRow(index, amount),
    afterGetColHeader: (col, headerElement) => { headerElement.className = 'htMiddle' },
    beforeKeyDown: (event: any) => {
      if (!event.target.closest(".handsontableInput")) {
        event.stopImmediatePropagation();
      }
    },
    columns: [
      {
        data: Columns.CATEGORY,
        title: 'Kategoria',
        type: 'dropdown',
        allowInvalid: false,
        source: (query: string, process: Function) => this.getAvailableCategoryNames(query, process),
      }, {
        data: Columns.NAME,
        title: 'Nazwa',
        type: 'autocomplete',
        source: (query: string, process: Function) => this.getPurchaseNameHints(query, process)
      }, {
        data: Columns.AMOUNT,
        title: 'Ilość (szt / kg)',
        type: 'numeric',
        allowInvalid: false,
      }, {
        data: Columns.PRICE,
        title: 'Cena',
        type: 'numeric',
        numericFormat: {
          culture: 'pl-PL',
          pattern: '$ 0,0.00'
        },
        allowInvalid: false
      }, {
        data: Columns.DESCRIPTION,
        title: 'Opis',
        type: 'text',
      }
    ]
  }

  constructor(
    private categoriesService: CategoriesService,
    private purchasesService: PurchasesService,
    private productsService: ProductsService,
    private dialog: MatDialog,
    private fb: FormBuilder
  ) { }

  @HostBinding('tabindex') tabindex = 0;

  @HostListener('focus')
  focusHandler() {
    this.hot.selectCell(0, 0);
    this.hot.getActiveEditor()?.beginEditing();
  }

  @HostListener('keydown.alt.enter', ['$event'])
  onAltEnter(e: any) {
    const selectedCell = this.hot.getSelectedLast();
    if (selectedCell != null) {
      this.hot.selectCell(selectedCell[0] + 1, 0);
    }
  }

  ngOnInit(): void {
    this.categoriesService.getProductCategories().subscribe(categories => this.updateAvailableCategories(...categories));
  }

  ngAfterViewInit(): void {
    this.hot = new HotTableRegisterer().getInstance("purchases-spreadsheet");
    this.hot.updateData(this.productsFormArray.value.map(row => ({...row, category: row?.category?.name})));
  }

  registerOnChange(fn: Function): void {
    this._onChange = fn;
  }

  registerOnTouched(fn: Function): void {
    this._onTouch = fn;
  }

  writeValue(purchases: any[]): void {
    console.log(purchases)
    this.productsFormArray = this.fb.array<FormGroup>(purchases.map(purchase => this.createPurchaseFormGroup(purchase)));
    this.hot?.updateData(this.productsFormArray.value.map(row => ({...row, category: row?.category?.name})));
  }

  validate({value}: AbstractControl): ValidationErrors | null {
    const purchases = this.productsFormArray.value.filter(isAnyPropertyNonNull);

    if (purchases.length === 0) {
      return {empty: true};
    }

    const requiredColumnsAreFilled = purchases.every(purchase => {
      return Object.keys(purchase).every(key => !this.REQUIRED_COLUMNS.includes(key) || purchase[key] != null);
    });

    if (!requiredColumnsAreFilled) {
      return {unfilled: true}
    }

    return null;
  }

  afterRemoveRow(index: number, amount: number): void {
    for (let i = 0; i < amount; i++) {
      this.productsFormArray.removeAt(index);
    }
    this._onChange(this.productsFormArray.value);
  }

  afterCreateRow(index: number, amount: number): void {
    for (let i = 0; i < amount; i++) {
      this.productsFormArray.insert(index + i, this.createPurchaseFormGroup({}));
    }
    this._onChange(this.productsFormArray.value);
  }

  beforeChange(changes: CellChange[]): boolean {
    if (!this.containsAnyAddCategoryChange(changes)) return true;

    const [addCategoryChanges, otherChanges] = changes.reduce(([addCategoryChanges, otherChanges], change) => {
      this.isAddCategoryChange(change) ? addCategoryChanges.push(change) : otherChanges.push(change);
      return [addCategoryChanges, otherChanges];
    }, [[], []] as [CellChange[], CellChange[]])

    this.openAddCategoryDialog().subscribe((category) =>
      this.hot.setDataAtRowProp(addCategoryChanges.map(([row, column]) => [row, column, category.name]))
    );

    this.hot.setDataAtRowProp(otherChanges.map(([row, column, preValue, newValue]) => [row, column, newValue]));

    return false;
  }

  afterChange(changes: CellChange[]): void {
    changes.forEach(change => this.setControlValue(change));
    this._onChange(this.productsFormArray.value);
  }

  getAvailableCategoryNames(searchPhrase: string, callback: Function): void {
    callback([...this.getFilteredCategoryNames(searchPhrase), this.ADD_CATEGORY_OPTION]);
  }

  getPurchaseNameHints(searchPhrase: string, callback: Function): void {
    this.productsService.getProductNames(searchPhrase).subscribe(response => callback(response));
  }

  private createPurchaseFormGroup(product: any): FormGroup {
    return this.fb.group({
      "category": [product.category],
      "name": [product.name],
      "amount": [product.amount],
      "price": [product.price],
      "description": [product.description]
    });
  }

  private containsAnyAddCategoryChange(changes: CellChange[]): boolean {
    return changes.some(change => this.isAddCategoryChange(change));
  }

  private isAddCategoryChange([row, column, preValue, newValue]: CellChange): boolean {
    return column === Columns.CATEGORY && newValue === this.ADD_CATEGORY_OPTION;
  }

  private openAddCategoryDialog(): Observable<CategoryDto> {
    return this.dialog
      .open(AddPurchaseCategoryDialog, {data: {name: ""}})
      .afterClosed()
      .pipe(
        filter(isNonNull),
        tap((savedCategory: CategoryDto) => this.updateAvailableCategories(savedCategory))
      );
  }

  private updateAvailableCategories(...categories: CategoryDto[]): void {
    this.categories = this.categories
      .concat(categories)
      .sort((a, b) => a.name.localeCompare(b.name));
  }

  private setControlValue([row, column, preValue, newValue]: CellChange): void {
    const rowFormGroup = this.productsFormArray.controls[row];
    const cellFormControl = rowFormGroup.controls[column];

    if (column === Columns.CATEGORY) {
      newValue = this.categories.find(category => newValue === category.name)
    }

    cellFormControl.patchValue(newValue)
  }

  private getFilteredCategoryNames(searchPhrase: string): string[] {
    return this.categories
      .map(({name}) => name)
      .filter(name => name.toLowerCase().includes(searchPhrase.toLowerCase()));
  }
}
