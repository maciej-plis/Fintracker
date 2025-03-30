import { DestroyRef, inject, Injectable, signal } from '@angular/core';
import { AddCategoryRequest, CategoriesApi, CategoryDTO } from '@core/api';
import { Observable, switchMap, tap } from 'rxjs';
import { connect } from 'ngxtension/connect';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';

@Injectable({ providedIn: 'root' })
export class CategoriesService {

  private readonly categoriesApi = inject(CategoriesApi);
  private readonly destroyRef = inject(DestroyRef);

  private readonly _categories = signal<CategoryDTO[]>([]);
  public readonly categories = this._categories.asReadonly();

  constructor() {
    this.refreshCategories();
  }

  public refreshCategories() {
    connect(this._categories, this.categoriesApi.getCategories(), this.destroyRef);
  }

  public saveCategory(dto: AddCategoryRequest): Observable<CategoryDTO> {
    return this.categoriesApi.addCategory(dto).pipe(
      takeUntilDestroyed(this.destroyRef),
      switchMap(categoryId => this.categoriesApi.getCategory(categoryId)),
      tap(category => this._categories.update(categories => [ ...categories, category ]))
    );
  }
}
