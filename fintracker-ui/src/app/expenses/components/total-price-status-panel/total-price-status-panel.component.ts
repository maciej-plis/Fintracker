import { ChangeDetectionStrategy, Component, signal } from '@angular/core';
import { IStatusPanelAngularComp } from 'ag-grid-angular';
import { IStatusPanelParams } from 'ag-grid-community';
import { ProductForm } from 'src/app/expenses/components/products-table/products-input-table.component';
import { CurrencyPipe } from '@angular/common';
import { currencyCode, currencyFormat, locale } from 'src/app/app.constants';
import { FormGroup } from '@angular/forms';

@Component({
  standalone: true,
  selector: 'app-total-price-status-panel',
  templateUrl: './total-price-status-panel.component.html',
  styleUrl: './total-price-status-panel.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [
    CurrencyPipe
  ]
})
export class TotalPriceStatusPanel implements IStatusPanelAngularComp {

  protected totalPrice = signal(0);

  protected currencyCode = currencyCode;
  protected currencySymbol = 'symbol-narrow';
  protected currencyFormat = currencyFormat;
  protected locale = locale;

  public agInit(params: IStatusPanelParams<FormGroup<ProductForm>>): void {
    params.api.addEventListener('rowDataUpdated', () => this.updateTotalPrice(params));
    params.api.addEventListener('cellValueChanged', () => this.updateTotalPrice(params));
  }

  public refresh(params: IStatusPanelParams): boolean {
    return true;
  }

  private updateTotalPrice(params: IStatusPanelParams<FormGroup<ProductForm>>): void {
    const rowData = this.getRowData(params);
    this.totalPrice.set(this.calculateTotalPrice(rowData));
  }

  private calculateTotalPrice(rowData: FormGroup<ProductForm>[]): number {
    if (rowData.length == 0) return 0;
    return rowData
      .map(row => this.calculatePrice(row))
      .reduce((a, b) => a + b);
  }

  private calculatePrice(product: FormGroup<ProductForm>): number {
    const {amount, price} = product.getRawValue();
    return (amount ?? 0) * (price ?? 0);
  }

  private getRowData({api}: IStatusPanelParams<FormGroup<ProductForm>>): FormGroup<ProductForm>[] {
    let rowData: FormGroup<ProductForm>[] = [];
    api.forEachNode(node => node.data && rowData.push(node.data));
    return rowData;
  }
}
