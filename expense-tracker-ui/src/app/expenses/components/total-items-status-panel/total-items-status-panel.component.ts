import { ChangeDetectionStrategy, Component, signal } from '@angular/core';
import { IStatusPanelAngularComp } from 'ag-grid-angular';
import { IStatusPanelParams } from 'ag-grid-community';
import { ProductsInputTableContext } from 'src/app/expenses/components/products-table/products-input-table.component';

@Component({
  standalone: true,
  selector: 'app-total-price-status-panel',
  templateUrl: './total-items-status-panel.component.html',
  styleUrl: './total-items-status-panel.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class TotalItemsStatusPanel implements IStatusPanelAngularComp {

  private params: IStatusPanelParams;

  protected totalItems = signal(0);

  public agInit(params: IStatusPanelParams): void {
    this.params = params;
    this.recalculate();
    this.context.formArray.valueChanges
      .subscribe(products => this.totalItems.set(products.length));
  }

  public refresh(params: IStatusPanelParams): boolean {
    this.params = params;
    return true;
  }

  public recalculate() {
    this.totalItems.set(this.context.formArray.getRawValue().length);
  }

  private get context(): ProductsInputTableContext {
    return this.params.context as ProductsInputTableContext;
  }
}
