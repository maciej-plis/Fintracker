import { Component, inject } from '@angular/core';
import { PurchasesApi } from '@core/api';
import { ActivatedRoute } from '@angular/router';
import { switchMap } from 'rxjs';

@Component({
  selector: 'app-edit-purchase',
  templateUrl: './edit-purchase.view.html',
  styleUrls: ['./edit-purchase.view.scss']
})
export class EditPurchaseView {

  private readonly routeParams = inject(ActivatedRoute).params;
  private readonly purchasesApi = inject(PurchasesApi);

  protected purchase = this.routeParams.pipe(
    switchMap(params => this.purchasesApi.getPurchase(params['purchaseId']))
  );

}
