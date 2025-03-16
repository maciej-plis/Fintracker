import { inject, Injectable, signal } from '@angular/core';
import { AddCategoryRequest, CategoriesApi, CategoryDTO } from '@core/api';
import { Observable, switchMap, tap } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CategoriesService {

  private readonly categoriesApi = inject(CategoriesApi);

  private readonly _categories = signal<CategoryDTO[]>([]);
  public readonly categories = this._categories.asReadonly();

  constructor() {
    this.refreshCategories();
  }

  public refreshCategories() {
    this.categoriesApi.getCategories().subscribe(categories =>
      this._categories.set(categories)
    );
  }

  public saveCategory(dto: AddCategoryRequest): Observable<CategoryDTO> {
    return this.categoriesApi.addCategory(dto).pipe(
      switchMap(categoryId => this.categoriesApi.getCategory(categoryId)),
      tap(category => this._categories.update(categories => [...categories, category]))
    );
  }
}
