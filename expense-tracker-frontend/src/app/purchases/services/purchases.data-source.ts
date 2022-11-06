import { DataSource } from "@angular/cdk/collections";
import { PurchaseItemDto, PurchaseItemsPage, PurchasesService } from "build/expense-tracker-frontend-api";
import { BehaviorSubject, catchError, finalize, Observable, of } from "rxjs";
import { SortDirection } from "@angular/material/sort";

export class PurchasesDataSource extends DataSource<PurchaseItemDto> {

  private purchasesSubject = new BehaviorSubject<PurchaseItemDto[]>([]);
  private totalItemsSubject = new BehaviorSubject<number>(0);
  private loadingSubject = new BehaviorSubject<boolean>(false);

  public loading$ = this.loadingSubject.asObservable();
  public totalItems$ = this.totalItemsSubject.asObservable();

  constructor(private purchasesService: PurchasesService) { super(); }

  connect(): Observable<PurchaseItemDto[]> {
    return this.purchasesSubject.asObservable();
  }

  disconnect(): void {
    this.purchasesSubject.complete();
    this.loadingSubject.complete();
  }

  loadPurchases(sortColumn: string, sortDirection: SortDirection, pageIndex = 0, pageSize = 10) {
    this.loadingSubject.next(true);
    this.purchasesService.getPurchaseItems(pageIndex, pageSize, `${sortColumn},${sortDirection}`)
      .pipe(
        catchError(err => this.handleLoadingError(err)),
        finalize(() => this.loadingSubject.next(false))
      )
      .subscribe(page => {
        this.purchasesSubject.next(page.content);
        this.totalItemsSubject.next(page.totalElements);
      });
  }

  private handleLoadingError(err: any): Observable<PurchaseItemsPage> {
    console.error("Error occurred: ", err)
    return of({
      content: [],
      totalElements: 0,
      totalPages: 0,
      first: true,
      last: true
    })
  }
}

