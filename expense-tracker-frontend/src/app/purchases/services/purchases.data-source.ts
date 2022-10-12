import { DataSource } from "@angular/cdk/collections";
import { PurchaseDto, PurchasesService } from "build/expense-tracker-frontend-api";
import { BehaviorSubject, catchError, finalize, Observable, of } from "rxjs";
import { Injectable } from "@angular/core";
import { PurchasesModule } from "../purchases.module";
import { SortDirection } from "@angular/material/sort";

export class PurchasesDataSource extends DataSource<PurchaseDto> {

  private purchasesSubject = new BehaviorSubject<PurchaseDto[]>([]);
  private loadingSubject = new BehaviorSubject<boolean>(false);

  public loading$ = this.loadingSubject.asObservable();

  constructor(private purchasesService: PurchasesService) { super(); }

  connect(): Observable<PurchaseDto[]> {
    return this.purchasesSubject.asObservable();
  }

  disconnect(): void {
    this.purchasesSubject.complete();
    this.loadingSubject.complete();
  }

  loadPurchases(sortColumn: string, sortDirection: SortDirection, pageIndex = 0, pageSize = 10) {
    this.loadingSubject.next(true);
    this.purchasesService.getPurchases().pipe(
      catchError(err => this.handleLoadingError(err)),
      finalize(() => this.loadingSubject.next(false))
    ).subscribe(purchases => this.purchasesSubject.next(purchases));
  }

  private handleLoadingError(err: any): Observable<PurchaseDto[]> {
    console.error("Error occurred: ", err)
    return of([])
  }
}

