import { ChangeDetectionStrategy, Component, signal } from '@angular/core';
import { IStatusPanelAngularComp } from 'ag-grid-angular';
import { IStatusPanelParams } from 'ag-grid-community';
import { ProductsInputTableContext } from 'src/app/expenses/components/products-table/products-input-table.component';
import { map } from 'rxjs';
import { CurrencyPipe } from '@angular/common';
import { currencyCode, currencyFormat, locale } from 'src/app/app.constants';

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

  private params: IStatusPanelParams;

  protected totalPrice = signal(0);

  protected currencyCode = currencyCode;
  protected currencySymbol = 'symbol-narrow';
  protected currencyFormat = currencyFormat;
  protected locale = locale;

  public agInit(params: IStatusPanelParams): void {
    this.params = params;
    this.recalculate();
    this.context.formArray.valueChanges
      .pipe(map(products => this.calculateTotalPrice(products)))
      .subscribe(totalPrice => this.totalPrice.set(totalPrice));
  }

  public refresh(params: IStatusPanelParams): boolean {
    this.params = params;
    return true;
  }

  public recalculate() {
    this.totalPrice.set(this.calculateTotalPrice(this.context.formArray.getRawValue()));
  }

  private calculateTotalPrice(products: any[]): number {
    if (products.length === 0) return 0;
    return products
      .map(product => (product?.price ?? 0) * (product?.amount ?? 0))
      .reduce((acc, value) => acc + value);
  }

  private get context(): ProductsInputTableContext {
    return this.params.context as ProductsInputTableContext;
  }
}
