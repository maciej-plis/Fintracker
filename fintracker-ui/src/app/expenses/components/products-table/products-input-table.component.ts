import { ChangeDetectionStrategy, Component, forwardRef, inject, viewChild } from '@angular/core';
import { ColDef, GridOptions } from 'ag-grid-community';
import { CategoryDTO, ProductDTO, ProductsApi } from '@core/api';
import { ControlValueAccessor, FormArray, FormControl, FormGroup, NG_VALIDATORS, NG_VALUE_ACCESSOR, ValidationErrors, Validator } from '@angular/forms';
import { buildProductForm, columnDefs, Columns } from './products-input-table.columns';
import { CategoriesService } from 'src/app/expenses/services/categories/categories.service';
import { TotalPriceStatusPanel } from 'src/app/expenses/components/total-price-status-panel/total-price-status-panel.component';
import { Observable } from 'rxjs';
import { TotalItemsStatusPanel } from 'src/app/expenses/components/total-items-status-panel/total-items-status-panel.component';
import { DialogService } from '@shared/services';
import { TableComponent } from '@shared/components';

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
  categoriesService: CategoriesService,
  dialogService: DialogService,
  valueChanges: Observable<Partial<ProductDTO>[]>
}

@Component({
  selector: 'app-products-input-table',
  templateUrl: './products-input-table.component.html',
  styleUrls: [ './products-input-table.component.scss' ],
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [ PRODUCTS_INPUT_TABLE_VALUE_ACCESSOR, PRODUCTS_INPUT_TABLE_VALUE_VALIDATOR ],
  imports: [
    TableComponent
  ]
})
export class ProductsInputTableComponent implements ControlValueAccessor, Validator {

  private readonly categoriesService = inject(CategoriesService);
  private readonly productsApi = inject(ProductsApi);
  private readonly dialogService = inject(DialogService);

  private readonly formArray = new FormArray<FormGroup<ProductForm>>([]);

  private readonly table = viewChild.required(TableComponent);

  public onTouched?: () => {};

  public validate(): ValidationErrors | null {
    return this.formArray.valid ? null : { 'invalidData': true };
  }

  public writeValue(products: ProductDTO[]): void {
    this.formArray.clear({ emitEvent: false });
    products.forEach(product => {
      const productForm = buildProductForm(product);
      this.formArray.push(productForm, { emitEvent: false });
    });
    this.refreshTableData();
  }

  public registerOnChange(callback: (value: any) => {}): void {
    this.formArray.valueChanges.subscribe(callback.bind(this));
  }

  public registerOnTouched(callback: () => {}): void {
    this.onTouched = callback;
  }

  private readonly defaultColDef: ColDef = {
    suppressHeaderMenuButton: true,
    sortable: false
  };

  public readonly gridOptions: GridOptions = {
    defaultColDef: this.defaultColDef,
    columnDefs: columnDefs,
    pagination: false,
    rowModelType: 'clientSide',
    suppressCellFocus: false,
    cellSelection: {
      enableHeaderHighlight: false,
      suppressMultiRanges: true,
      handle: {
        mode: 'fill'
      }
    },
    pinnedTopRowData: [ buildProductForm() ],
    stopEditingWhenCellsLoseFocus: true,
    rowData: [],
    statusBar: {
      statusPanels: [
        { key: 'totalItems', statusPanel: TotalItemsStatusPanel, align: 'left' },
        { key: 'totalPrice', statusPanel: TotalPriceStatusPanel, align: 'left' }
      ]
    },
    processCellForClipboard: params => JSON.stringify(params.value),
    processCellFromClipboard: params => JSON.parse(params.value),
    context: {
      formArray: this.formArray,
      productsApi: this.productsApi,
      categoriesService: this.categoriesService,
      dialogService: this.dialogService
    } as ProductsInputTableContext,
    onGridReady: () => this.refreshTableData()
  };

  private refreshTableData() {
    this.table().api?.autoSizeColumns([ Columns.NUMERATOR ]);
    this.table().api?.setGridOption('rowData', this.formArray.controls);
    this.table().api?.refreshCells({ force: true });
  }
}
