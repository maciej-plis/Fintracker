import { ChangeDetectionStrategy, Component } from '@angular/core';
import { PurchasesTableComponent } from 'src/app/expenses/components';
import { Card } from 'primeng/card';

@Component({
  selector: 'app-purchases',
  templateUrl: './purchases.view.html',
  styleUrls: [ './purchases.view.scss' ],
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [
    PurchasesTableComponent,
    Card
  ]
})
export class PurchasesView {
}
