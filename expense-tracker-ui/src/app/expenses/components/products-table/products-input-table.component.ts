import { ChangeDetectionStrategy, Component, forwardRef, inject } from '@angular/core';
import { ColDef, GridApi, GridOptions, GridReadyEvent } from 'ag-grid-community';
import { CategoryDTO, ProductDTO, ProductsApi } from '@core/api';
import { ControlValueAccessor, FormArray, FormControl, FormGroup, NG_VALIDATORS, NG_VALUE_ACCESSOR, ValidationErrors, Validator } from '@angular/forms';
import { buildProductForm, columnDefs, Columns } from './products-input-table.columns';
import { CategoriesService } from 'src/app/expenses/services/categories/categories.service';

export const PRODUCTS_INPUT_TABLE_VALUE_ACCESSOR: any = {
  provide: NG_VALUE_ACCESSOR,
  useExisting: forwardRef(() => ProductsInputTableComponent),
  multi: true
};

export const PRODUCTS_INPUT_TABLE_VALUE_VALIDATOR: any = {
  provide: NG_VALIDATORS,
  useExisting: forwardRef(() => ProductsInputTableComponent),
  multi: true
};

export interface ProductForm {
  id: FormControl<string>;
  category: FormControl<CategoryDTO | null>;
  name: FormControl<string | null>;
  amount: FormControl<number | null>;
  price: FormControl<number | null>;
  description: FormControl<string | null>;
}

export interface ProductsInputTableContext {
  formArray: FormArray<FormGroup<ProductForm>>,
  productsApi: ProductsApi,
  categoriesService: CategoriesService
}

@Component({
  selector: 'app-products-input-table',
  templateUrl: './products-input-table.component.html',
  styleUrls: ['./products-input-table.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [PRODUCTS_INPUT_TABLE_VALUE_ACCESSOR, PRODUCTS_INPUT_TABLE_VALUE_VALIDATOR]
})
export class ProductsInputTableComponent implements ControlValueAccessor, Validator {

  private readonly categoriesService = inject(CategoriesService);
  private readonly productsApi = inject(ProductsApi);

  private readonly formArray = new FormArray<FormGroup<ProductForm>>([]);

  public onTouched: Function;

  private api: GridApi;

  public validate(): ValidationErrors | null {
    return this.formArray.valid ? null : {'invalidData': true};
  }

  public writeValue(products: ProductDTO[]): void {
    this.formArray.clear({emitEvent: false});
    products.forEach(product => {
      const productForm = buildProductForm(product);
      this.formArray.push(productForm);
    });
    this.refreshTableData();
  }

  public registerOnChange(callback: Function): void {
    this.formArray.valueChanges.subscribe(callback.bind(this));
  }

  public registerOnTouched(callback: Function): void {
    this.onTouched = callback;
  }

  private readonly defaultColDef: ColDef = {
    suppressMenu: true,
    sortable: false
  };

  public readonly gridOptions: GridOptions = {
    defaultColDef: this.defaultColDef,
    columnDefs: columnDefs,
    pagination: false,
    rowModelType: 'clientSide',
    rowSelection: undefined,
    suppressCellFocus: false,
    enableRangeSelection: true,
    suppressMultiRangeSelection: true,
    enableFillHandle: true,
    pinnedTopRowData: [buildProductForm()],
    stopEditingWhenCellsLoseFocus: true,
    rowData: [],
    processCellForClipboard: params => JSON.stringify(params.value),
    processCellFromClipboard: params => JSON.parse(params.value),
    tabToNextCell: params => params.nextCellPosition,
    context: {
      formArray: this.formArray,
      productsApi: this.productsApi,
      categoriesService: this.categoriesService
    } as ProductsInputTableContext
  };

  public onGridReady(event: GridReadyEvent) {
    this.api = event.api;
    this.api.autoSizeColumns([Columns.NUMERATOR]);
    this.refreshTableData();
  }


  private refreshTableData() {
    if (!this.api) return;
    this.api.setGridOption('rowData', this.formArray.controls);
    this.api.refreshCells({force: true});
  }
}
