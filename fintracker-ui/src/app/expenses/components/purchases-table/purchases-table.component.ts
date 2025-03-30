import { Component, inject } from '@angular/core';
import { TableComponent } from '@shared/components/table/table.component';
import { ButtonModule } from 'primeng/button';
import { PurchasesTableService } from '@expenses/services/purchases-table/purchases-table.service';

@Component({
  selector: 'app-purchases-table',
  templateUrl: './purchases-table.component.html',
  styleUrl: './purchases-table.component.scss',
  imports: [ TableComponent, ButtonModule ],
  providers: [ PurchasesTableService ]
})
export class PurchasesTableComponent {
  protected readonly tableService = inject(PurchasesTableService);
}
