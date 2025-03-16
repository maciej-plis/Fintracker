import { ChangeDetectionStrategy, Component, signal } from '@angular/core';
import { IStatusPanelAngularComp } from 'ag-grid-angular';
import { IStatusPanelParams } from 'ag-grid-community';
import { ProductForm } from 'src/app/expenses/components/products-table/products-input-table.component';
import { FormGroup } from '@angular/forms';

@Component({
  standalone: true,
  selector: 'app-total-price-status-panel',
  templateUrl: './total-items-status-panel.component.html',
  styleUrl: './total-items-status-panel.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class TotalItemsStatusPanel implements IStatusPanelAngularComp {

  protected readonly totalItems = signal(0);

  public agInit(params: IStatusPanelParams<FormGroup<ProductForm>>): void {
    params.api.addEventListener('rowDataUpdated', () => {
      const rowData = this.getRowData(params);
      this.totalItems.set(rowData.length);
    });
  }

  public refresh(params: IStatusPanelParams): boolean {
    return true;
  }

  private getRowData({api}: IStatusPanelParams<FormGroup<ProductForm>>): FormGroup<ProductForm>[] {
    let rowData: FormGroup<ProductForm>[] = [];
    api.forEachNode(node => node.data && rowData.push(node.data));
    return rowData;
  }
}
